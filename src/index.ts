import {IRenderMimeRegistry} from '@jupyterlab/rendermime';
import {markupRendererFactory} from "./factories";
import {JupyterFrontEnd, JupyterFrontEndPlugin} from '@jupyterlab/application';


const extension: JupyterFrontEndPlugin<void> = {
    id: '@agoose77/jupyterlab-markup',
    autoStart: true,
    requires: [IRenderMimeRegistry],
    activate: (app: JupyterFrontEnd, registry: IRenderMimeRegistry) => {
        console.log('JupyterLab extension @agoose77/jupyterlab-markup is activated!');
        registry.addFactory(markupRendererFactory);
    }
};


export default extension;
