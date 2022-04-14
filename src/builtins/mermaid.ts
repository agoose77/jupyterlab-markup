import { PACKAGE_NS, simpleMarkdownItPlugin } from '..';

/**
 * Provides text-based diagrams in code blocks
 */
export const mermaid = simpleMarkdownItPlugin(PACKAGE_NS, {
  id: '@agoose77/markdown-it-mermaid',
  title: 'Mermaid',
  description: 'Create diagrams and visualizations using text and code.',
  documentationUrls: {
    Plugin: 'https://github.com/agoose77/markdown-it-mermaid',
    MermaidJS: 'https://mermaid-js.github.io/mermaid'
  },
  examples: {
    'Mermaid Flowchart': `
  \`\`\`mermaid
  graph TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;
  \`\`\``
  },
  plugin: async () => {
    const mermaidPlugin = await import(
      /* webpackChunkName: "markdown-it-diagrams" */ '@agoose77/markdown-it-mermaid'
    );
    return [mermaidPlugin.default];
  }
});
