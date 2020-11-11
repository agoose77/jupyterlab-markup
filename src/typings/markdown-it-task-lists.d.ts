declare module 'markdown-it-task-lists' {
  import MarkdownIt = require('markdown-it');

  namespace markdownItTaskList {
    function tasklist_plugin(md: MarkdownIt, opts: any): void;
  }

  const MarkdownItTaskList: typeof markdownItTaskList.tasklist_plugin;
  export = MarkdownItTaskList;
}
