import { VDomModel, VDomRenderer } from '@jupyterlab/apputils';

import * as React from 'react';

import { MarkdownItManager } from './manager';

const SETTINGS_CLASS = 'jp-MarkdownItSettings';

/**
 * A configuration/documentation UI for markdown-it plugins
 */
export class MarkdownItSettings extends VDomRenderer<MarkdownItSettings.Model> {
  constructor(model: MarkdownItSettings.Model) {
    super(model);
    this.addClass(SETTINGS_CLASS);
    this.addClass('jp-RenderedHTMLCommon');
  }

  dispose() {
    super.dispose();
    this.model.dispose();
  }

  /**
   * Render the settings form
   */
  protected render() {
    const manager = this.model?.manager;
    if (manager == null) {
      return <div />;
    }

    const { pluginProviderIds } = manager;

    return (
      <div>
        <table>
          <thead>{this.renderHeader()}</thead>
          <tbody>
            {pluginProviderIds.map(this.renderPluginProvider, this)}
          </tbody>
        </table>
      </div>
    );
  }

  /**
   * Render the table header
   */
  protected renderHeader() {
    return (
      <tr>
        <th>ID</th>
        <th>Plugin</th>
        <th>Description</th>
        <th>Enabled</th>
      </tr>
    );
  }

  /**
   * Render a single plugin provider
   */
  protected renderPluginProvider(id: string) {
    const m = this.model;
    const provider = m.manager.getPluginProvider(id);
    if (!provider) {
      return (
        <tr key={id}>
          <th>
            <code>{id}</code>
          </th>
        </tr>
      );
    }

    return (
      <tr key={id}>
        <th>
          <code>{id}</code>
        </th>
        <th>{provider.title}</th>
        <td>{provider.description}</td>
        <td>
          <input
            type="checkbox"
            value={id}
            defaultChecked={m.disabledPlugins.indexOf(id) === -1}
            onChange={this.onPluginEnabledChanged}
          />
        </td>
      </tr>
    );
  }

  protected onPluginEnabledChanged = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = evt.currentTarget;
    this.model.setPluginEnabled(value, checked);
  };
}

export namespace MarkdownItSettings {
  /**
   * A model for managing markdown-it plugin settings
   */
  export class Model extends VDomModel {
    _manager: MarkdownItManager;
    disabledPlugins: string[] = [];

    dispose() {
      super.dispose();
      if (this._manager) {
        this._manager.settingsChanged.disconnect(this.onSettingsChanged, this);
        this._manager = null;
      }
    }

    get manager() {
      return this._manager;
    }

    set manager(manager) {
      this._manager = manager;
      if (manager) {
        manager.settingsChanged.connect(this.onSettingsChanged, this);
      }
      this.stateChanged.emit(void 0);
    }

    setPluginEnabled(id: string, enabled: boolean) {
      let disabledPlugins = this.disabledPlugins.slice();
      const idx = disabledPlugins.indexOf(id);
      if (enabled) {
        disabledPlugins.splice(idx);
      } else {
        disabledPlugins.push(id);
      }
      if (disabledPlugins.length) {
        this.manager.settings.set('disabled-plugins', disabledPlugins);
      } else {
        this.manager.settings.remove('disabled-plugins');
      }
    }

    onSettingsChanged() {
      this.disabledPlugins = (this.manager.settings.composite[
        'disabled-plugins'
      ] || []) as string[];
      this.stateChanged.emit(void 0);
    }
  }
}
