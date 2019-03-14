declare module "markdown-it-sanitizer"
{
    import MarkdownIt = require("markdown-it");
    namespace sanitizer {
        interface Options {
            removeUnknown?: boolean;
            removeUnbalanced?: boolean;
            imageClass?: string;
        }

        export class sanitizer_plugin {
            constructor(md: MarkdownIt, ...params: any[]);

            getUrl(link: string): string | null;

            replaceUnknownTags(str: string): string;

            sanitizeInlineAndBlock(state: any): void;

            balance(state: any): string | null;

            replaceAllUnbalancedTags(str: string): string;
        }
    }
    function sanitizer(md: MarkdownIt, opts: sanitizer.Options): void;
    export = sanitizer
}
