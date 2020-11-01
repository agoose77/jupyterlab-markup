import {
  IRenderMimeRegistry,
  markdownRendererFactory,
} from '@jupyterlab/rendermime';
import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import { IMarkdownIt, PLUGIN_ID } from './tokens';
import { MarkdownItManager } from './manager';
import { RenderedMarkdown } from './widgets';

const core: JupyterFrontEndPlugin<IMarkdownIt> = {
  id: PLUGIN_ID,
  autoStart: true,
  requires: [IRenderMimeRegistry],
  provides: IMarkdownIt,
  activate: (app: JupyterFrontEnd, registry: IRenderMimeRegistry) => {
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
  activate: (app: JupyterFrontEnd, markdownIt: IMarkdownIt) => {
    markdownIt.addPluginProvider('markdown-it-diagrams', async () => {
      const { diagramPlugin, awaitRenderAvailable } = await import(
        /* webpackChunkName: "markdown-it-diagrams" */ 'markdown-it-diagrams'
      );
      await awaitRenderAvailable();
      return diagramPlugin;
    });
  },
};

const footnote: JupyterFrontEndPlugin<void> = {
  id: `${PLUGIN_ID}:footnote`,
  autoStart: true,
  requires: [IMarkdownIt],
  activate: (app: JupyterFrontEnd, markdownIt: IMarkdownIt) => {
    markdownIt.addPluginProvider('markdown-it-footnote', async () => {
      const footnotePlugin = await import(
        /* webpackChunkName: "markdown-it-footnote" */ 'markdown-it-footnote'
      );
      return footnotePlugin.default;
    });
  },
};

const deflist: JupyterFrontEndPlugin<void> = {
  id: `${PLUGIN_ID}:deflist`,
  autoStart: true,
  requires: [IMarkdownIt],
  activate: (app: JupyterFrontEnd, markdownIt: IMarkdownIt) => {
    markdownIt.addPluginProvider('markdown-it-deflist', async () => {
      const deflistPlugin = await import(
        /* webpackChunkName: "markdown-it-deflist" */ 'markdown-it-deflist'
      );
      return deflistPlugin.default;
    });
  },
};

export default [core, diagrams, footnote, deflist];
