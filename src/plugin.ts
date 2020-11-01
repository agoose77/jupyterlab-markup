import { markdownRendererFactory } from '@jupyterlab/rendermime';
import { JupyterFrontEndPlugin } from '@jupyterlab/application';

import { IMarkdownIt, PLUGIN_ID } from './tokens';
import { MarkdownItManager } from './manager';
import { RenderedMarkdown } from './widgets';

const core: JupyterFrontEndPlugin<IMarkdownIt> = {
  id: PLUGIN_ID,
  autoStart: true,
  provides: IMarkdownIt,
  activate: (app) => {
    const manager = new MarkdownItManager();
    RenderedMarkdown.markdownItManager = manager;
    markdownRendererFactory.createRenderer = (options) =>
      new RenderedMarkdown(options);
    return manager;
  },
};

const diagrams: JupyterFrontEndPlugin<void> = {
  id: `${PLUGIN_ID}:diagrams`,
  autoStart: true,
  requires: [IMarkdownIt],
  activate: (app, markdownIt: IMarkdownIt) => {
    markdownIt.addPluginProvider({
      id: 'markdown-it-diagrams',
      plugin: async () => {
        const { diagramPlugin, awaitRenderAvailable } = await import(
          /* webpackChunkName: "markdown-it-diagrams" */ 'markdown-it-diagrams'
        );
        await awaitRenderAvailable();
        return diagramPlugin;
      },
    });
  },
};

const footnote: JupyterFrontEndPlugin<void> = {
  id: `${PLUGIN_ID}:footnote`,
  autoStart: true,
  requires: [IMarkdownIt],
  activate: (app, markdownIt: IMarkdownIt) => {
    markdownIt.addPluginProvider({
      id: 'markdown-it-footnote',
      plugin: async () => {
        const footnotePlugin = await import(
          /* webpackChunkName: "markdown-it-footnote" */ 'markdown-it-footnote'
        );
        return footnotePlugin.default;
      },
    });
  },
};

const deflist: JupyterFrontEndPlugin<void> = {
  id: `${PLUGIN_ID}:deflist`,
  autoStart: true,
  requires: [IMarkdownIt],
  activate: (app, markdownIt: IMarkdownIt) => {
    markdownIt.addPluginProvider({
      id: 'markdown-it-deflist',
      plugin: async () => {
        const deflistPlugin = await import(
          /* webpackChunkName: "markdown-it-deflist" */ 'markdown-it-deflist'
        );
        return deflistPlugin.default;
      },
    });
  },
};

export default [core, diagrams, footnote, deflist];
