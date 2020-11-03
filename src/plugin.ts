import { JupyterFrontEndPlugin } from '@jupyterlab/application';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { MainAreaWidget, ICommandPalette } from '@jupyterlab/apputils';
import { markdownIcon } from '@jupyterlab/ui-components';

import { CommandIDs, IMarkdownIt, PACKAGE_NS } from './tokens';
import { MarkdownItManager } from './manager';
import { RenderedMarkdown } from './widgets';
import { MarkdownItSettings } from './settings';

import { BUILTINS } from './builtins';

import '../style/index.css';

/**
 * The main plugin which overloads default markdown rendering by `marked`
 */
const core: JupyterFrontEndPlugin<IMarkdownIt> = {
  id: `${PACKAGE_NS}:core`,
  autoStart: true,
  provides: IMarkdownIt,
  requires: [ISettingRegistry, ICommandPalette],
  activate: (app, settings: ISettingRegistry, palette: ICommandPalette) => {
    const manager = new MarkdownItManager();
    // set the static manager
    RenderedMarkdown.markdownItManager = manager;
    // eventually load settings
    settings
      .load(core.id)
      .then((settings) => (manager.settings = settings))
      .catch(console.warn);

    // commands
    app.commands.addCommand(CommandIDs.showSettings, {
      label: 'Markdown Extensions...',
      execute: (args) => {
        const model = new MarkdownItSettings.Model();
        model.manager = manager;
        const content = new MarkdownItSettings(model);
        const main = new MainAreaWidget({ content });
        main.title.label = 'Markdown Extensions';
        main.title.icon = markdownIcon;
        app.shell.add(main, 'main');
      },
    });

    palette.addItem({
      command: CommandIDs.showSettings,
      category: 'Markdown',
    });

    return manager;
  },
};

export default [core, ...BUILTINS];
