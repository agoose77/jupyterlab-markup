import * as MarkdownIt from 'markdown-it';
import { IMarkdownIt } from './tokens';

import { CodeMirrorEditor, Mode } from '@jupyterlab/codemirror';

import { RenderedMarkdown } from './widgets';

export class MarkdownItManager implements IMarkdownIt {
  private _pluginProviders: Map<
    string,
    IMarkdownIt.IPluginProvider
  > = new Map();

  /**
   * Add a provider for a plugin which can be resolved lazily
   */
  addPluginProvider(provider: IMarkdownIt.IPluginProvider): void {
    this._pluginProviders.set(provider.id, provider);
  }

  /**
   * Remove a provider by name
   */
  removePluginProvider(name: string) {
    this._pluginProviders.delete(name);
  }

  /**
   * Get a MarkdownIt instance
   */
  async getMarkdownIt(
    widget: RenderedMarkdown,
    options: MarkdownIt.Options = {}
  ): Promise<MarkdownIt> {
    let md = new MarkdownIt({
      ...this.getOptions(widget),
      ...options,
    });

    for (const [name, provider] of this._pluginProviders.entries()) {
      try {
        const [plugin, options] = await provider.plugin();
        md = md.use(plugin, options);
      } catch (err) {
        console.warn(`Failed to load/use markdown-it plugin ${name}`, err);
      }
    }

    return md;
  }

  async getOptions(widget: RenderedMarkdown) {
    let allOptions = this.baseMarkdownItOptions;

    for (const [name, plugin] of this._pluginProviders.entries()) {
      if (plugin.options == null) {
        continue;
      }
      try {
        allOptions = { ...allOptions, ...(await plugin.options(widget)) };
      } catch (err) {
        console.warn(
          `Failed to get options from markdown-it plugin ${name}`,
          err
        );
      }
    }
    return allOptions;
  }

  /**
   * Default MarkdownIt options, may be overridden by plugins
   */
  get baseMarkdownItOptions() {
    return {
      html: true,
      linkify: true,
      typographer: true,
      langPrefix: `cm-s-${CodeMirrorEditor.defaultConfig.theme} language-`,
      highlight: this.highlightCode,
    };
  }

  /**
   * Use CodeMirror to highlight code blocks, may be overriden by plugins
   */
  highlightCode = (str: string, lang: string) => {
    if (!lang) {
      return ''; // use external default escaping
    }
    try {
      let spec = Mode.findBest(lang);
      if (!spec) {
        console.warn(`No CodeMirror mode: ${lang}`);
        return;
      }

      let el = document.createElement('div');
      try {
        Mode.run(str, spec.mime, el);
        return el.innerHTML;
      } catch (err) {
        console.warn(`Failed to highlight ${lang} code`, err);
      }
    } catch (err) {
      console.log(`No CodeMirror mode: ${lang}`);
      console.warn(`Require CodeMirror mode error: ${err}`);
    }
    return '';
  };
}
