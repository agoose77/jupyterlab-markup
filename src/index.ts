import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the jupyterlab-markup extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab-markup',
  autoStart: true,
  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension jupyterlab-markup is activated!');
  }
};

export default extension;
