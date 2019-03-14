import {renderHTML} from "@jupyterlab/rendermime"
import { IRenderMime } from '@jupyterlab/rendermime-interfaces';
import { ISanitizer } from '@jupyterlab/apputils';
import * as MarkdownIt from "markdown-it"
import {awaitRenderAvailable} from "./plugins"

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
    // Unpack the options.
    let { host, source, md, trusted, ...others} = options;

    // Clear the content if there is no source.
    if (!source) {
        host.textContent = '';
        return;
    }

    // Need to be able to render!
    await awaitRenderAvailable();
    let html = md.render(source);


    await renderHTML({host, source: html, trusted:true, ...others});

    // // Separate math from normal markdown text.
    // let parts = removeMath(source);
    //
    // // Convert the markdown to HTML.
    // let html = await Private.renderMarked(parts['text']);
    //
    // // Replace math.
    // html = replaceMath(html, parts['math']);
    //
    // // Render HTML.
    // await renderHTML({
    //     host,
    //     source: html,
    //     ...others
    // });
    //
    // // Apply ids to the header nodes.
    // Private.headerAnchors(host);
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
        md: MarkdownIt;

        /**
         * The LaTeX typesetter for the application.
         */
        latexTypesetter: IRenderMime.ILatexTypesetter | null;
    }
}
