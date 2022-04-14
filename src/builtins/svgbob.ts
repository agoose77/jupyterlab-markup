import { PACKAGE_NS, simpleMarkdownItPlugin } from '..';

/**
 * Provides ASCII diagrams in code blocks
 */
export const svgbob = simpleMarkdownItPlugin(PACKAGE_NS, {
  id: '@agoose77/markdown-it-svgbob',
  title: 'Svgbob',
  description: 'ASCII diagrams rendered by Svgbob',
  documentationUrls: {
    Plugin: 'https://github.com/agoose77/markdown-it-svgbob',
    svgbob: 'https://github.com/ivanceras/svgbob'
  },
  examples: {
    svgbob: `
  \`\`\`svgbob
       .---.
      /-o-/--
   .-/ / /->
  ( *  \\/
   '-.  \\
      \\ /
       '
  \`\`\`
          `
  },
  plugin: async () => {
    const factory = await import(
      /* webpackChunkName: "markdown-it-diagrams" */ '@agoose77/markdown-it-svgbob'
    );
    return [await factory.default()];
  }
});
