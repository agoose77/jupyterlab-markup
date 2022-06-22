import { Signal } from '@lumino/signaling';

import { IRenderMime, markdownRendererFactory } from '@jupyterlab/rendermime';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { CodeMirrorEditor, Mode } from '@jupyterlab/codemirror';

import MarkdownIt from 'markdown-it';

import { RenderedMarkdown } from './widgets';
import { IMarkdownIt } from './tokens';

/**
 * Comparator of IRanked implementations
 */
function rankedComparator(default_rank: number) {
  return (left: IMarkdownIt.IRanked, right: IMarkdownIt.IRanked) =>
    (left.rank ?? default_rank) - (right.rank ?? default_rank);
}

/**
 * An implementation of a source of markdown renderers with markdown-it and plugins
 */
export class MarkdownItManager implements IMarkdownIt {
  settingsChanged = new Signal<MarkdownItManager, void>(this);

  /**
   * A list of plugin ids disabled by user settings
   */
  protected userDisabledPlugins: string[] = [];

  /**
   * MarkdownIt options configured by the user.
   */
  protected userMarkdownItOptions: { [key: string]: any } = {};

  /**
   * Per-plugin options configured by the user.
   */
  protected userPluginOptions: { [key: string]: any[] } = {};

  /**
   * A handle on the settings for this plugin, which will be set... eventually
   */
  private _settings: ISettingRegistry.ISettings | null;

  /**
   * Providers labeled by an arbitrary key (usually the markdown-it package name)
   */
  private _pluginProviders: Map<string, IMarkdownIt.IPluginProvider> =
    new Map();

  constructor() {
    markdownRendererFactory.createRenderer = this.createRenderer;
  }

  /**
   * Update the settings, and handle changes.
   */
  set settings(settings) {
    if (this._settings) {
      this._settings.changed.disconnect(this.onSettingsChanged, this);
    }
    this._settings = settings;
    if (settings !== null) {
      this._settings.changed.connect(this.onSettingsChanged, this);
      this.onSettingsChanged();
    }
  }

  /**
   * The settings
   */
  get settings(): ISettingRegistry.ISettings | null {
    return this._settings;
  }

  /**
   * Update caches of settings values for new renderers
   */
  protected onSettingsChanged() {
    this.userMarkdownItOptions =
      (this.settings?.composite['markdown-it-options'] as any) || {};

    this.userDisabledPlugins =
      (this.settings?.composite['disabled-plugins'] as string[]) || [];

    this.userPluginOptions =
      (this.settings?.composite['plugin-options'] as {
        [key: string]: any[];
      }) || {};

    // re-broadcast settings changes
    this.settingsChanged.emit(void 0);
  }

  /**
   * Add a provider for a plugin which can be resolved lazily
   */
  addPluginProvider(provider: IMarkdownIt.IPluginProvider): void {
    this._pluginProviders.set(provider.id, provider);
  }

  getPluginProvider(id: string) {
    return this._pluginProviders.get(id);
  }

  get pluginProviderIds() {
    return [...this._pluginProviders.keys()];
  }

  /**
   * Remove a provider by name
   */
  removePluginProvider(name: string) {
    this._pluginProviders.delete(name);
  }

  /**
   * Create a new renderer, either with markdown-it or the original implementation
   */
  protected createRenderer = (options: IRenderMime.IRendererOptions) => {
    return new RenderedMarkdown(options);
  };

  async getRenderer(
    widget: RenderedMarkdown,
    options: MarkdownIt.Options = {}
  ): Promise<IMarkdownIt.IRenderer> {
    // Create MarkdownIt instance
    const allOptions = {
      ...(await this.getOptions(widget)),
      ...options,
      ...this.userMarkdownItOptions
    };
    let md = new MarkdownIt('default', allOptions);

    // Sort providers by rank
    const rankComparator = rankedComparator(100);
    const pluginProviders = [...this._pluginProviders.values()];
    pluginProviders.sort(rankComparator);

    // Lifecycle hooks
    const preParseHooks: IMarkdownIt.IPreParseHook[] = [];
    const postRenderHooks: IMarkdownIt.IPostRenderHook[] = [];
    for (const provider of pluginProviders) {
      if (this.userDisabledPlugins.indexOf(provider.id) !== -1) {
        continue;
      }
      try {
        const userOptions = this.userPluginOptions[provider.id] || [];
        const [plugin, ...pluginOptions] = await provider.plugin();
        let i = 0;
        const maxOptions = Math.max(pluginOptions.length, userOptions.length);
        const compositeOptions = new Array(maxOptions);
        while (i < maxOptions) {
          compositeOptions[i] =
            i < userOptions.length ? userOptions[i] : pluginOptions[i];
          i++;
        }
        md = md.use(plugin, ...compositeOptions);

        // Build table of lifecycle hooks
        if (provider?.preParseHook !== undefined) {
          preParseHooks.push(await provider.preParseHook());
        }
        if (provider?.postRenderHook !== undefined) {
          postRenderHooks.push(await provider.postRenderHook());
        }
      } catch (err) {
        console.warn(
          `Failed to load/use markdown-it plugin ${provider.id}`,
          err
        );
      }
    }
    // Sort hooks by rank
    preParseHooks.sort(rankComparator);
    postRenderHooks.sort(rankComparator);

    return {
      get markdownIt(): MarkdownIt {
        return md;
      },

      render: content => md.render(content),

      // Run hooks serially
      preParse: async (content: string) => {
        for (const hook of preParseHooks) {
          content = await hook.preParse(content);
        }
        return content;
      },

      // Run hooks serially
      postRender: async (node: HTMLElement) => {
        for (const hook of postRenderHooks) {
          await hook.postRender(node);
        }
      }
    };
  }

  /**
   * Combine core options with base options, plugin provider options, and user settings
   */
  async getOptions(widget: RenderedMarkdown) {
    let allOptions = this.baseMarkdownItOptions;

    for (const [id, plugin] of this._pluginProviders.entries()) {
      if (this.userDisabledPlugins.indexOf(id) !== -1) {
        continue;
      }

      // eslint-disable-next-line eqeqeq
      if (plugin.options == null) {
        continue;
      }
      try {
        allOptions = { ...allOptions, ...(await plugin.options(widget)) };
      } catch (err) {
        console.warn(
          `Failed to get options from markdown-it plugin ${id}`,
          err
        );
      }
    }
    return allOptions;
  }

  /**
   * Default MarkdownIt options,
   *
   * NOTE: May be overridden by plugins
   */
  get baseMarkdownItOptions() {
    return {
      html: true,
      linkify: true,
      typographer: true,
      langPrefix: `cm-s-${CodeMirrorEditor.defaultConfig.theme} language-`,
      highlight: this.highlightCode
    };
  }

  /**
   * Use CodeMirror to highlight code blocks,
   *
   * NOTE: May be overridden by plugins
   */
  highlightCode = (str: string, lang: string) => {
    if (!lang) {
      return ''; // use external default escaping
    }
    try {
      const spec = Mode.findBest(lang);
      if (!spec) {
        console.warn(`No CodeMirror mode: ${lang}`);
        return;
      }

      const el = document.createElement('div');
      try {
        Mode.run(str, spec.mime, el);
        return el.innerHTML;
      } catch (err) {
        console.warn(`Failed to highlight ${lang} code`, err);
      }
    } catch (err) {
      console.warn(`No CodeMirror mode: ${lang}`);
      console.warn(`Require CodeMirror mode error: ${err}`);
    }
    return '';
  };
}
