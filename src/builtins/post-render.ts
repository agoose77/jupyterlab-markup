import { PACKAGE_NS, simpleMarkdownItPlugin, IMarkdownIt } from '..';
import type MarkdownIt from 'markdown-it';
/**
 * Adds anchors to headers
 */
export const postRender = simpleMarkdownItPlugin(PACKAGE_NS, {
  id: 'markdown-it-post-render',
  title: 'Post Render',
  description: 'Create post renders for roast fenders',
  documentationUrls: {},
  plugin: async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return [(md: MarkdownIt) => {}];
  },
  postRenderHook(): Promise<IMarkdownIt.IPostRenderHook> {
    return Promise.resolve({
      rank: 100,
      async postRender(node: HTMLElement) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        node.innerHTML = node.innerHTML.replace('pre', 'post');
        return;
      }
    });
  }
});
