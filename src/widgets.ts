import { RenderedHTMLCommon } from '@jupyterlab/rendermime';
import { IRenderMime } from '@jupyterlab/rendermime-interfaces';
import { Message } from '@lumino/messaging';
import * as renderers from './renderers';
import { IMarkdownIt } from './tokens';

/**
 * A mime renderer for displaying Markdown with embedded latex.
 */
export class RenderedMarkdown extends RenderedHTMLCommon {
  /**
   * Construct a new rendered markdown widget.
   *
   * @param options - The options for initializing the widget.
   */
  renderer: IMarkdownIt.IRenderer = null;

  /**
   * A static manager set by the core plugin for getting MarkdownIt instances
   */
  static markdownItManager: IMarkdownIt;

  constructor(options: IRenderMime.IRendererOptions) {
    super(options);
    this.addClass('jp-RenderedMarkdown');
  }

  /**
   * Render a mime model.
   *
   * @param model - The mime model to render.
   *
   * @returns A promise which resolves when rendering is complete.
   */
  async render(model: IRenderMime.IMimeModel): Promise<void> {
    if (this.renderer === null) {
      this.renderer = await RenderedMarkdown.markdownItManager.getRenderer(
        this,
        {}
      );
    }
    return await renderers.renderMarkdown({
      host: this.node,
      source: String(model.data[this.mimeType]),
      trusted: model.trusted,
      resolver: this.resolver,
      sanitizer: this.sanitizer,
      linkHandler: this.linkHandler,
      shouldTypeset: this.isAttached,
      renderer: this.renderer,
      latexTypesetter: this.latexTypesetter
    });
  }

  /**
   * A message handler invoked on an `'after-attach'` message.
   */
  onAfterAttach(msg: Message): void {
    // Don't render math automatically
    // if (this.latexTypesetter ) {
    //   this.latexTypesetter.typeset(this.node);
    // }
  }
}
