import { JupyterFrontEndPlugin } from '@jupyterlab/application';
import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { IMarkdownIt, PACKAGE_NS } from './tokens';
import { MarkdownItManager } from './manager';
import { RenderedMarkdown } from './widgets';

import { BUILTINS } from './builtins';

/**
 * The main plugin which overloads default markdown rendering by `marked`
 */
const core: JupyterFrontEndPlugin<IMarkdownIt> = {
  id: `${PACKAGE_NS}:core`,
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

export default [core, ...BUILTINS];
