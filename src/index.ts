import { IRenderMime } from '@jupyterlab/rendermime-interfaces';
import {MIME_TYPE, markupRendererFactory} from "./factories";

import '../style/index.css';



const extensions: IRenderMime.IExtension | IRenderMime.IExtension[] = [
  {
    id: '@agoose77/jupyterlab-markup:factory',
    rendererFactory: markupRendererFactory,
    rank: 0,
    dataType: 'string',
    fileTypes: [
      {
        name: 'markdown',
        mimeTypes: [MIME_TYPE],
        extensions: ['.md']
      }
    ],
    documentWidgetFactoryOptions: {
      name: 'Markdown',
      primaryFileType: 'markdown',
      fileTypes: ['markdown'],
      defaultFor: ['markdown']
    }
  }
];


export default extensions;
