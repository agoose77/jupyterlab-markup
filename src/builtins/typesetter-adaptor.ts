import { IMarkdownIt, PACKAGE_NS } from '..';
import { ILatexTypesetter } from '@jupyterlab/rendermime';
import { JupyterFrontEndPlugin } from '@jupyterlab/application';

/**
 * Adds anchors to headers
 */
const plugin_id = 'typesetter-adaptor';
export const typesetterAdaptor: JupyterFrontEndPlugin<void> = {
  id: `${PACKAGE_NS}:${plugin_id}`,
  autoStart: true,
  requires: [IMarkdownIt, ILatexTypesetter],
  activate: (app, markdownIt: IMarkdownIt, typesetter: ILatexTypesetter) => {
    const provider: IMarkdownIt.IPluginProvider = {
      id: plugin_id,
      title: 'ILatexTypesetter Adaptor',
      description:
        'Enable math rendering using JupyterLab ILatexTypesetter interface',
      documentationUrls: {},
      postRenderHook: {
        async postRender(node: HTMLElement): Promise<void> {
          const math_selectors = ['.math'];
          // Find nodes to typeset
          const nodes = [
            ...node.querySelectorAll(math_selectors.join(','))
          ] as HTMLElement[];
          // Only typeset these nodes
          await Promise.all(nodes.map(node => typesetter.typeset(node)));
        }
      }
    };
    markdownIt.addPluginProvider(provider);
  }
};
