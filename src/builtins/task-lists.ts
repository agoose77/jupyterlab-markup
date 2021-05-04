import { PACKAGE_NS, simpleMarkdownItPlugin } from '..';

/**
 * Adds github-flavored task lists
 */
export const taskLists = simpleMarkdownItPlugin(PACKAGE_NS, {
  id: 'markdown-it-task-lists',
  title: 'Task Lists',
  description: 'Create checklists from lists',
  documentationUrls: {
    Plugin: 'https://github.com/revin/markdown-it-task-lists'
  },
  examples: {
    Example: `
- [x] done
- [ ] to do
- [ ] ~~not going to do~~
      `
  },
  plugin: async () => {
    const tasklistPlugin = await import(
      /* webpackChunkName: "markdown-it-task-lists" */ 'markdown-it-task-lists'
    );
    return [tasklistPlugin.default];
  }
});
