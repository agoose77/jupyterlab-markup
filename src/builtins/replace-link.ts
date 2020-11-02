import { PACKAGE_NS, simpleMarkdownItPlugin } from '..';
import { PathExt } from '@jupyterlab/coreutils';

/**
 * Replaces relative links with the Jupyter files URLs
 */
export const replaceLink = simpleMarkdownItPlugin(PACKAGE_NS, {
  id: 'markdown-it-replace-link',
  title: 'Replace Links',
  description: 'Replaces relative links to local Jupyter URLs',
  documentationUrls: {
    Plugin: 'markdown-it-replace-link',
  },
  options: async (widget) => {
    const { resolver } = widget;
    return {
      replaceLink: function (link: string, env: any) {
        // hacky, but this can't be a promise
        if (!resolver.isLocal(link)) {
          return link;
        }
        const cwd = encodeURI(PathExt.dirname((resolver as any)._parent.path));
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
