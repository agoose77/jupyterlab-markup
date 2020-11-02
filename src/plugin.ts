import { PathExt } from '@jupyterlab/coreutils';

import { JupyterFrontEndPlugin } from '@jupyterlab/application';
import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { IMarkdownIt, PLUGIN_ID } from './tokens';
import { MarkdownItManager } from './manager';
import { RenderedMarkdown } from './widgets';

/**
 * The main plugin which overloads default markdown rendering by `marked`
 */
const core: JupyterFrontEndPlugin<IMarkdownIt> = {
  id: `${PLUGIN_ID}:core`,
  autoStart: true,
  provides: IMarkdownIt,
  requires: [ISettingRegistry],
  activate: (app, settings: ISettingRegistry) => {
    const manager = new MarkdownItManager();
    // set the static manager
    RenderedMarkdown.markdownItManager = manager;
    // eventually load settings
    settings
      .load(core.id)
      .then((settings) => (manager.settings = settings))
      .catch(console.warn);
    return manager;
  },
};

/**
 * Provides text-based diagrams in code blocks
 */
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
        return [diagramPlugin];
      },
    });
  },
};

/**
 * Provides footnotes
 */
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
        return [footnotePlugin.default];
      },
    });
  },
};

/**
 * Provides definition lists
 */
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
        return [deflistPlugin.default];
      },
    });
  },
};

/**
 * Replaces local links to the Jupyter files URL
 */
const replacelink: JupyterFrontEndPlugin<void> = {
  id: `${PLUGIN_ID}:markdown-it-replace-link`,
  autoStart: true,
  requires: [IMarkdownIt],
  activate: (app, markdownIt: IMarkdownIt) => {
    markdownIt.addPluginProvider({
      id: 'markdown-it-replace-link',
      options: async (widget) => {
        const { resolver } = widget;
        return {
          replaceLink: function (link: string, env: any) {
            // hacky, but this can't be a promise
            if (!resolver.isLocal(link)) {
              return link;
            }
            const cwd = encodeURI(
              PathExt.dirname((resolver as any)._parent.path)
            );
            return PathExt.resolve(cwd, link);
          },
        };
      },
      plugin: async () => {
        const replaceLinkPlugin = await import(
          /* webpackChunkName: "markdown-it-replace-link" */ 'markdown-it-replace-link'
        );
        return [replaceLinkPlugin.default];
      },
    });
  },
};

/**
 * Adds anchors to headers
 */
const anchor: JupyterFrontEndPlugin<void> = {
  id: `${PLUGIN_ID}:markdown-it-anchor`,
  autoStart: true,
  requires: [IMarkdownIt],
  activate: (app, markdownIt: IMarkdownIt) => {
    markdownIt.addPluginProvider({
      id: 'markdown-it-anchor',
      plugin: async () => {
        const anchorPlugin = await import(
          /* webpackChunkName: "markdown-it-anchor" */ 'markdown-it-anchor'
        );
        return [
          anchorPlugin.default,
          {
            permalink: true,
            permalinkClass: 'jp-InternalAnchorLink',
          },
        ];
      },
    });
  },
};

/**
 * Adds github-flavored task lists
 */
const tasklist: JupyterFrontEndPlugin<void> = {
  id: `${PLUGIN_ID}:markdown-it-task-lists`,
  autoStart: true,
  requires: [IMarkdownIt],
  activate: (app, markdownIt: IMarkdownIt) => {
    markdownIt.addPluginProvider({
      id: 'markdown-it-task-lists',
      plugin: async () => {
        const tasklistPlugin = await import(
          /* webpackChunkName: "markdown-it-task-lists" */ 'markdown-it-task-lists'
        );
        return [tasklistPlugin.default];
      },
    });
  },
};

export default [
  core,
  // plugins
  anchor,
  deflist,
  diagrams,
  footnote,
  replacelink,
  tasklist,
];
