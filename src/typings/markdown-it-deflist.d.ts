declare module 'markdown-it-deflist' {
  import MarkdownIt = require('markdown-it');

  namespace markdownItDeflist {
    function deflist_plugin(md: MarkdownIt): void;
  }

  const MarkdownItDeflist: typeof markdownItDeflist.deflist_plugin;
  export = MarkdownItDeflist;
}
