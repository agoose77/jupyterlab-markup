import { JupyterFrontEndPlugin } from '@jupyterlab/application';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { MainAreaWidget, ICommandPalette } from '@jupyterlab/apputils';
import { markdownIcon, LabIcon } from '@jupyterlab/ui-components';

// optional
import { IMainMenu } from '@jupyterlab/mainmenu';

import {
  CommandIDs,
  IMarkdownIt,
  PACKAGE_NS,
  COMMAND_CATEGORY
} from './tokens';
import { MarkdownItManager } from './manager';
import { RenderedMarkdown } from './widgets';
import { MarkdownItSettings } from './settings';

import { BUILTINS } from './builtins';

import '../style/index.css';

const ICON_ID = 'jupyterlab-markup:core';

const markupIcon = new LabIcon({
  name: ICON_ID,
  svgstr: markdownIcon.svgstr.replace('jp-icon-contrast0', 'jp-icon-contrast1')
});

/**
 * The main plugin which overloads default markdown rendering by `marked`
 */
const core: JupyterFrontEndPlugin<IMarkdownIt> = {
  id: `${PACKAGE_NS}:core`,
  autoStart: true,
  provides: IMarkdownIt,
  requires: [ISettingRegistry, ICommandPalette],
  optional: [IMainMenu],
  activate: (
    app,
    settings: ISettingRegistry,
    palette: ICommandPalette,
    menu?: IMainMenu
  ) => {
    const { commands, shell } = app;
    const manager = new MarkdownItManager();
    // set the static manager
    RenderedMarkdown.markdownItManager = manager;
    // eventually load settings
    settings
      .load(core.id)
      .then(settings => (manager.settings = settings))
      .catch(console.warn);

    let settingsMain: MainAreaWidget;

    // commands
    commands.addCommand(CommandIDs.showSettings, {
      label: 'Markdown Extension Settings...',
      execute: args => {
        if (settingsMain == null) {
          const model = new MarkdownItSettings.Model();
          model.advancedRequested.connect(() =>
            commands.execute('settingeditor:open')
          );
          model.manager = manager;
          const content = new MarkdownItSettings(model);
          settingsMain = new MainAreaWidget({ content });
          settingsMain.title.label = 'Markdown Extensions';
          settingsMain.title.icon = markupIcon;
          settingsMain.disposed.connect(() => (settingsMain = null));
        }
        shell.add(settingsMain, 'main');
        shell.activateById(settingsMain.id);
      }
    });

    // cached enabled setting
    let enabled = true;

    manager.settingsChanged.connect(() => {
      const { composite } = manager.settings;
      if (composite != null) {
        enabled = !!composite.enabled;
      }
    });

    commands.addCommand(CommandIDs.toggleRenderer, {
      label: args => 'Use Markdown Extensions',
      caption: 'Reopen documents to see changes',
      isToggled: () => enabled,
      isEnabled: () => manager.settings != null,
      execute: args => {
        manager.enabled = !!(args?.enabled == null ? !enabled : args.enabled);
      }
    });

    palette.addItem({
      command: CommandIDs.showSettings,
      category: COMMAND_CATEGORY
    });

    palette.addItem({
      command: CommandIDs.toggleRenderer,
      category: COMMAND_CATEGORY
    });

    if (menu) {
      menu.settingsMenu.addGroup(
        [
          { command: CommandIDs.toggleRenderer },
          { command: CommandIDs.showSettings }
        ],
        100
      );
    }

    return manager;
  }
};

export default [core, ...BUILTINS];
