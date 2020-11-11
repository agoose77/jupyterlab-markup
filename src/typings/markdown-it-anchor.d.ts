declare module 'markdown-it-anchor' {
  import MarkdownIt = require('markdown-it');

  namespace markdownItFootnote {
    function anchor_plugin(md: MarkdownIt): void;
  }

  const MarkdownItAnchor: typeof markdownItFootnote.anchor_plugin;
  export = MarkdownItAnchor;
}
