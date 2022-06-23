import { Token } from '@lumino/coreutils';
import MarkdownIt from 'markdown-it';
import { RenderedMarkdown } from './widgets';

/**
 * The ID stem for all plugins
 */
export const PACKAGE_NS = '@agoose77/jupyterlab-markup';

/**
 * The category for markdown extension commands
 */
export const COMMAND_CATEGORY = 'Markdown Extensions';

/* tslint:disable */
/**
 * The MarkdownIt manager token.
 */
export const IMarkdownIt = new Token<IMarkdownIt>(PACKAGE_NS);
/* tslint:enable */

/**
 * A manager for adding MarkdownIt plugins
 */
export interface IMarkdownIt {
  addPluginProvider(provider: IMarkdownIt.IPluginProvider): void;
  removePluginProvider(id: string): void;
  getPluginProvider(id: string): IMarkdownIt.IPluginProvider | null;
  // Deprecated
  getMarkdownIt(
    widget: RenderedMarkdown,
    options?: MarkdownIt.Options
  ): Promise<MarkdownIt>;
  getRenderer(
    widget: RenderedMarkdown,
    options?: MarkdownIt.Options
  ): Promise<IMarkdownIt.IRenderer>;
  pluginProviderIds: string[];
}

/**
 * A namespace for lumino command IDs
 */
export namespace CommandIDs {
  export const showSettings = 'markdown-it:show-settings';
  export const toggleRenderer = 'markdown-it:toggle-renderer';
}

/**
 * A namespace for plugin-related types and interfaces
 */
export namespace IMarkdownIt {
  export interface IRanked {
    /**
     * Order (ascending), default of 100;
     */
    rank?: number;
  }
  export interface IPlugin {
    (md: MarkdownIt, ...params: any[]): void;
  }
  export interface IPluginProvider extends IRanked {
    /**
     * A unique identifier for the plugin, usually the name of the upstream package
     */
    id: string;
    /**
     * A human-readable name for the plugin
     */
    title: string;
    /**
     * A short description for the plugin
     */
    description: string;
    /**
     * URLs for learning more about the plugin with human-readable keys
     */
    documentationUrls: { [key: string]: string };
    /**
     * Short usage examples of any new syntax with human-readable keys
     */
    examples?: { [key: string]: string };
    /**
     * A lazy provider of the plugin function and plugin options
     */
    plugin?(): Promise<[IPlugin, ...any]>;
    /**
     * Additional options to pass to the MarkdownIt constructor
     */
    options?(widget: RenderedMarkdown): Promise<{ [key: string]: any }>;
    /**
     * A lazy provider of a post-render hook
     */
    preParseHook?: IPreParseHook;
    /**
     * A lazy provider of a post-render hook
     */
    postRenderHook?: IPostRenderHook;
  }
  export interface IPreParseHook extends IRanked {
    /**
     * Pre-parsing callback
     */
    preParse(content: string): Promise<string>;
  }
  export interface IPostRenderHook extends IRanked {
    /**
     * Post-rendering callback
     */
    postRender(node: HTMLElement): Promise<void>;
  }
  export interface IRenderer {
    markdownIt: MarkdownIt;

    /**
     * Interface to render content to HTML
     * @param content
     */
    render(content: string): string;

    /**
     * Interface to transform pre-parsed Markdown
     * @param node
     */
    preParse(node: string): Promise<string>;

    /**
     * Interface to transform rendered HTML
     * @param node
     */
    postRender(node: HTMLElement): Promise<void>;
  }
}
