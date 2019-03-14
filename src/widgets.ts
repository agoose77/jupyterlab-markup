import {RenderedHTMLCommon} from "@jupyterlab/rendermime"
import { IRenderMime } from '@jupyterlab/rendermime-interfaces';
import { Message } from '@phosphor/messaging';
import * as renderers from "./renderers";
import * as MarkdownIt from "markdown-it";
import { Mode, CodeMirrorEditor } from '@jupyterlab/codemirror';
import {bobPlugin} from './plugins';

/**
 * A mime renderer for displaying Markdown with embedded latex.
 */
export class RenderedMarkdown extends RenderedHTMLCommon {
    /**
     * Construct a new rendered markdown widget.
     *
     * @param options - The options for initializing the widget.
     */
    md: MarkdownIt;

    constructor(options: IRenderMime.IRendererOptions) {
        super(options);
        this.addClass('jp-RenderedMarkdown');
        console.log("INIT");
        // let pattern = /^bob\s+(.*)$/;
        this.md = new MarkdownIt({
            html: true,
            linkify: true,
            typographer: true,
            langPrefix: `cm-s-${CodeMirrorEditor.defaultConfig.theme} language-`,
            highlight: function (str: string, lang: string) {
                console.log("User highlighter");
                if (!lang) {
                    console.log("No lang");
                    return ''; // use external default escaping
                }
                try {
                    let spec = Mode.findBest(lang);
                    console.log(spec);
                    if (!spec) {
                        console.log(`No CodeMirror mode: ${lang}`);
                        return;
                    }

                    let el = document.createElement('div');
                    try {
                        Mode.run(str, spec.mime, el);
                        return el.innerHTML;
                    } catch (err) {
                        console.log(`Failed to highlight ${lang} code`, err);
                    }

                } catch(err){
                        console.log(`No CodeMirror mode: ${lang}`);
                        console.log(`Require CodeMirror mode error: ${err}`);
                }
                return '';
            }
        }).use(bobPlugin);
    }

    /**
     * Render a mime model.
     *
     * @param model - The mime model to render.
     *
     * @returns A promise which resolves when rendering is complete.
     */
    render(model: IRenderMime.IMimeModel): Promise<void> {
        return renderers.renderMarkdown({
            host: this.node,
            source: String(model.data[this.mimeType]),
            trusted: model.trusted,
            resolver: this.resolver,
            sanitizer: this.sanitizer,
            linkHandler: this.linkHandler,
            shouldTypeset: this.isAttached,
            md: this.md,
            latexTypesetter: this.latexTypesetter
        });
    }

    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    onAfterAttach(msg: Message): void {
        if (this.latexTypesetter) {
            this.latexTypesetter.typeset(this.node);
        }
    }
}
