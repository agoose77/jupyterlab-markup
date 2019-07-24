import {IRenderMimeRegistry} from '@jupyterlab/rendermime';
import {markupRendererFactory} from "./factories";
import {IMarkdownViewerTracker} from "@jupyterlab/markdownviewer"
import {IEditorTracker} from "@jupyterlab/fileeditor"
import {JupyterFrontEnd, JupyterFrontEndPlugin} from '@jupyterlab/application';


const extension: JupyterFrontEndPlugin<void> = {
    id: '@agoose77/jupyterlab-markup',
    autoStart: true,
    requires: [IRenderMimeRegistry, IMarkdownViewerTracker, IEditorTracker],
    activate: (app: JupyterFrontEnd, registry: IRenderMimeRegistry,
               markdownViewerTracker: IMarkdownViewerTracker,
               editorTracker: IEditorTracker) => {
        console.log('JupyterLab extension @agoose77/jupyterlab-markup is activated!');
        registry.addFactory(markupRendererFactory);
    }
};


export default extension;
