import * as MarkdownIt from "markdown-it";
// import * as MarkdownItContainer from "markdown-it-container";


// Globally store module when available
let svgbob: any = null;

// Define interface to await readiness of import
export async function awaitRenderAvailable()
{
    if (svgbob === null){
        svgbob = await import("svgbob-wasm");
    }
}


export function bobPlugin(md: MarkdownIt, options: any) {
    options = options || {};

    let openMarker = options.openMarker || "```bob",
        openChar = openMarker.charCodeAt(0),
        closeMarker = options.closeMarker || "```",
        closeChar = closeMarker.charCodeAt(0),
        render = options.render || md.renderer.rules.image;

    function bob(state: any, startLine: number, endLine: number, silent?: boolean): boolean | void {
        let nextLine, token, i,
            autoClosed = false,
            start = state.bMarks[startLine] + state.tShift[startLine],
            max = state.eMarks[startLine];

        // Check out the first character quickly,
        // this should filter out most of non-uml blocks
        //
        if (openChar !== state.src.charCodeAt(start)) { return false; }

        // Check out the rest of the marker string
        //
        for (i = 0; i < openMarker.length; ++i) {
            if (openMarker[i] !== state.src[start + i]) { return false; }
        }

        // Since start is found, we can report success here in validation mode
        //
        if (silent) { return true; }

        // Search for the end of the block
        //
        nextLine = startLine;

        for (;;) {
            nextLine++;
            if (nextLine >= endLine) {
                // unclosed block should be autoclosed by end of document.
                // also block seems to be autoclosed by end of parent
                return false;
            }

            start = state.bMarks[nextLine] + state.tShift[nextLine];
            max = state.eMarks[nextLine];

            if (start < max && state.sCount[nextLine] < state.blkIndent) {
                // non-empty line with negative indent should stop the list:
                // - ```
                //  testK
                break;
            }

            if (closeChar !== state.src.charCodeAt(start)) {
                // didn't find the closing fence
                continue;
            }

            if (state.sCount[nextLine] > state.sCount[startLine]) {
                // closing fence should not be indented with respect of opening fence
                continue;
            }

            let closeMarkerMatched = true;
            for (i = 0; i < closeMarker.length; ++i) {
                if (closeMarker[i] !== state.src[start + i]) {
                    closeMarkerMatched = false;
                    break;
                }
            }

            if (!closeMarkerMatched) {
                continue;
            }

            // make sure tail has spaces only
            if (state.skipSpaces(start + i) < max) {
                continue;
            }

            // found!
            autoClosed = true;
            break;
        }

        let contents = state.src
            .split('\n')
            .slice(startLine + 1, nextLine)
            .join('\n');

        // We generate a token list for the alt property, to mimic what the image parser does.
        // Remove leading space if any.
        let html = svgbob.convert_string(contents);
        token = state.push('html_block', '', 0);
        token.content = html;
        token.map = [startLine, nextLine];

        state.line = nextLine + (autoClosed ? 1 : 0);

        return true;
    }

    // @ts-ignore
    md.block.ruler.before('fence', 'bob_diagram', bob, {
        alt: [ 'paragraph', 'reference', 'blockquote', 'list']
    });
    md.renderer.rules.uml_diagram = render;
}
