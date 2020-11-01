import * as MarkdownIt from 'markdown-it';
import { IMarkdownIt } from './tokens';

import { CodeMirrorEditor, Mode } from '@jupyterlab/codemirror';

export class MarkdownItManager implements IMarkdownIt {
  private _pluginProviders: Map<
    string,
    IMarkdownIt.IPluginProvider
  > = new Map();

  /**
   * add a provider for a plugin which can be resolve lazily
   */
  addPluginProvider(name: string, provider: IMarkdownIt.IPluginProvider): void {
    this._pluginProviders.set(name, provider);
  }

  /**
   * remove a provider by name
   */
  removePluginProvider(name: string) {
    this._pluginProviders.delete(name);
  }

  async getMarkdownIt(options: MarkdownIt.Options = {}): Promise<MarkdownIt> {
    let md = new MarkdownIt({
      ...this.baseMarkdownItOptions,
      ...options,
    });

    for (const [name, provider] of this._pluginProviders.entries()) {
      try {
        const plugin = await provider();
        md = md.use(plugin);
      } catch (err) {
        console.warn(`Failed to load/use markdown-it plugin ${name}`, err);
      }
    }

    return md;
  }

  get baseMarkdownItOptions() {
    return {
      html: true,
      linkify: true,
      typographer: true,
      langPrefix: `cm-s-${CodeMirrorEditor.defaultConfig.theme} language-`,
      highlight: this.highlightCode,
    };
  }

  highlightCode = (str: string, lang: string) => {
    if (!lang) {
      return ''; // use external default escaping
    }
    try {
      let spec = Mode.findBest(lang);
      console.log(spec);
      if (!spec) {
        console.log(`No CodeMirror mode: ${lang}`);
        return;
      }

      let el = document.createElement('div');
      try {
        Mode.run(str, spec.mime, el);
        return el.innerHTML;
      } catch (err) {
        console.log(`Failed to highlight ${lang} code`, err);
      }
    } catch (err) {
      console.log(`No CodeMirror mode: ${lang}`);
      console.log(`Require CodeMirror mode error: ${err}`);
    }
    return '';
  };
}
