import { PACKAGE_NS, simpleMarkdownItPlugin } from '..';

/**
 * Provides text-based diagrams in code blocks
 */
export const diagrams = simpleMarkdownItPlugin(PACKAGE_NS, {
  id: 'markdown-it-diagrams',
  title: 'Diagrams',
  description: 'Diagrams in code blocks from mermaid and svgbob',
  documentationUrls: {
    Plugin: 'https://github.com/agoose77/markdown-it-diagrams',
    MermaidJS: 'https://mermaid-js.github.io/mermaid',
    svgbob: 'https://github.com/ivanceras/svgbob'
  },
  examples: {
    'Mermaid Flowchart': `
  \`\`\`mermaid
  graph TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;
  \`\`\``,
    svgbob: `
  \`\`\`bob
      .---.
      /-o-/--
  .-/ / /->
  ( *  /
  '-.  \
       /
      '
  \`\`\`
          `
  },
  plugin: async () => {
    const { loadPluginFactory } = await import(
      /* webpackChunkName: "markdown-it-diagrams" */ 'markdown-it-diagrams'
    );
    return [await loadPluginFactory()];
  }
});
