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
    const provider = this.model.manager.getPluginProvider(id);
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
          <input type="checkbox" />
        </td>
      </tr>
    );
  }
}

export namespace MarkdownItSettings {
  /**
   * A model for managing markdown-it plugin settings
   */
  export class Model extends VDomModel {
    _manager: MarkdownItManager;

    get manager() {
      return this._manager;
    }

    set manager(manager) {
      this._manager = manager;
      if (manager) {
        manager.settingsChanged.connect(() => this.stateChanged.emit(void 0));
      }
      this.stateChanged.emit(void 0);
    }
  }
}
