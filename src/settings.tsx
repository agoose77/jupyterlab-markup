import { VDomModel, VDomRenderer } from '@jupyterlab/apputils';

import * as React from 'react';

import { IMarkdownIt } from './tokens';

/**
 * A configuration/documentation UI for markdown-it plugins
 */
export class MarkdownItSettings extends VDomRenderer<MarkdownItSettings.Model> {
  protected render() {
    return <div />;
  }
}

export namespace MarkdownItSettings {
  /**
   * A model for managing markdown-it plugin settings
   */
  export class Model extends VDomModel {
    _manager: IMarkdownIt;

    get manager() {
      return this._manager;
    }

    set manager(manager) {
      this._manager = manager;
      this.stateChanged.emit(void 0);
    }
  }
}
