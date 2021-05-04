import { JupyterFrontEndPlugin } from '@jupyterlab/application';

import { IMarkdownIt } from './tokens';

/**
 * Convenience method for building JupyterLab MarkdownIt plugins
 */
export function simpleMarkdownItPlugin(
  packageName: string,
  provider: IMarkdownIt.IPluginProvider
): JupyterFrontEndPlugin<void> {
  return {
    id: `${packageName}:${provider.id}`,
    autoStart: true,
    requires: [IMarkdownIt],
    activate: (app, markdownIt: IMarkdownIt) => {
      markdownIt.addPluginProvider(provider);
    }
  };
}
