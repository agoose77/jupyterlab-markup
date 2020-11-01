declare module 'markdown-it-replace-link' {
  import MarkdownIt = require('markdown-it');

  namespace markdownItDeflist {
    function replacelink_plugin(md: MarkdownIt, opts: any): void;
  }

  const MarkdownItReplaceLink: typeof markdownItDeflist.replacelink_plugin;
  export = MarkdownItReplaceLink;
}
