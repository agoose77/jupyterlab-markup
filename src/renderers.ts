import { renderHTML } from '@jupyterlab/rendermime';
import { IRenderMime } from '@jupyterlab/rendermime-interfaces';
import { ISanitizer } from '@jupyterlab/apputils';
import { IMarkdownIt } from './tokens';

/**
 * Render Markdown into a host node.
 *
 * @params options - The options for rendering.
 *
 * @returns A promise which resolves when rendering is complete.
 */
export async function renderMarkdown(
  options: renderMarkdown.IRenderOptions
): Promise<void> {
  const { host, source, renderer, ...others } = options;

  // Clear the content if there is no source.
  if (!source) {
    host.textContent = '';
    return;
  }

  // Render HTML.
  await renderHTML({
    host,
    source: renderer.render(source),
    ...others,
    shouldTypeset: false
  });
  await renderer.postRender(host);
}

/**
 * The namespace for the `renderMarkdown` function statics.
 */
export namespace renderMarkdown {
  /**
   * The options for the `renderMarkdown` function.
   */
  export interface IRenderOptions {
    /**
     * The host node for the rendered Markdown.
     */
    host: HTMLElement;

    /**
     * The Markdown source to render.
     */
    source: string;

    /**
     * Whether the source is trusted.
     */
    trusted: boolean;

    /**
     * The html sanitizer for untrusted source.
     */
    sanitizer: ISanitizer;

    /**
     * An optional url resolver.
     */
    resolver: IRenderMime.IResolver | null;

    /**
     * An optional link handler.
     */
    linkHandler: IRenderMime.ILinkHandler | null;

    /**
     * Whether the node should be typeset.
     */
    shouldTypeset: boolean;

    /**
     * MarkdownIt renderer
     */
    renderer: IMarkdownIt.IRenderer;

    /**
     * The LaTeX typesetter for the application.
     */
    latexTypesetter: IRenderMime.ILatexTypesetter | null;
  }
}
