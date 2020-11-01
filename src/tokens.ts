import { Token } from '@lumino/coreutils';
import MarkdownIt from 'markdown-it';

export const PLUGIN_ID = '@agoose77/jupyterlab-markup';

/* tslint:disable */
/**
 * The MarkdownIt manager token.
 */
export const IMarkdownIt = new Token<IMarkdownIt>(PLUGIN_ID);
/* tslint:enable */

export interface IMarkdownIt {
  addPluginProvider(provider: IMarkdownIt.IPluginProvider): void;
  removePluginProvider(id: string): void;
  getMarkdownIt(options?: MarkdownIt.Options): Promise<MarkdownIt>;
}

export namespace IMarkdownIt {
  export interface IPlugin {
    (md: MarkdownIt, ...params: any[]): void;
  }
  export interface IPluginProvider {
    id: string;
    plugin: () => Promise<IPlugin>;
  }
}
