import { PACKAGE_NS, simpleMarkdownItPlugin } from '..';

/**
 * Provides definition lists
 */
export const deflist = simpleMarkdownItPlugin(PACKAGE_NS, {
  id: 'markdown-it-deflist',
  title: 'Definition Lists',
  description: 'Create definition lists',
  documentationUrls: {
    Plugin: 'https://github.com/markdown-it/markdown-it-deflist'
  },
  examples: {
    Example: `
Term 1
~ Definition 1

Term 2
~ Definition 2a
~ Definition 2b
      `
  },
  plugin: async () => {
    const deflistPlugin = await import(
      /* webpackChunkName: "markdown-it-deflist" */ 'markdown-it-deflist'
    );
    return [deflistPlugin.default];
  }
});
