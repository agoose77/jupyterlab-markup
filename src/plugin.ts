import { JupyterFrontEndPlugin } from '@jupyterlab/application';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { MainAreaWidget, ICommandPalette } from '@jupyterlab/apputils';
import { markdownIcon, LabIcon } from '@jupyterlab/ui-components';

import { CommandIDs, IMarkdownIt, PACKAGE_NS } from './tokens';
import { MarkdownItManager } from './manager';
import { RenderedMarkdown } from './widgets';
import { MarkdownItSettings } from './settings';

import { BUILTINS } from './builtins';

import '../style/index.css';

const ICON_ID = `jupyterlab-markup:core`;

const markupIcon = new LabIcon({
  name: ICON_ID,
  svgstr: markdownIcon.svgstr.replace('jp-icon-contrast0', 'jp-icon-contrast1'),
});

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

    let settingsMain: MainAreaWidget;

    // commands
    app.commands.addCommand(CommandIDs.showSettings, {
      label: 'Markdown Extensions...',
      execute: (args) => {
        if (settingsMain == null) {
          const model = new MarkdownItSettings.Model();
          model.advancedRequested.connect(() =>
            app.commands.execute('settingeditor:open')
          );
          model.manager = manager;
          const content = new MarkdownItSettings(model);
          settingsMain = new MainAreaWidget({ content });
          settingsMain.title.label = 'Markdown Extensions';
          settingsMain.title.icon = markupIcon;
          settingsMain.disposed.connect(() => (settingsMain = null));
        }
        app.shell.add(settingsMain, 'main');
        app.shell.activateById(settingsMain.id);
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
