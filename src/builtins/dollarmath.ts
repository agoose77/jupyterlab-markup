import { PACKAGE_NS, simpleMarkdownItPlugin } from '..';

interface IRenderOptions {
  displayMode: boolean;
}

/**
 * ADd support for math parsing
 */
export const dollarmath = simpleMarkdownItPlugin(PACKAGE_NS, {
  id: 'markdown-it-dollarmath',
  title: 'Dollar Math',
  description: 'Parse inline and display LaTeX math using $-delimiters',
  documentationUrls: {
    Plugin: 'https://github.com/executablebooks/markdown-it-dollarmath'
  },
  plugin: async () => {
    const dollarmathPlugin = await import(
      /* webpackChunkName: "markdown-it-anchor" */ 'markdown-it-dollarmath'
    );
    return [
      dollarmathPlugin.default,
      {
        allow_space: true,
        allow_digits: true,
        double_inline: false,
        allow_labels: true,
        labelNormalizer(label: string) {
          return label.replace(/[\s]+/g, '-');
        },
        renderer(content: string, opts: IRenderOptions) {
          const { displayMode } = opts;
          if (displayMode) {
            return `<div class="math math_display">$$${content}$$</div>`;
          } else {
            return `<div class="math math_inline">$${content}$</div>`;
          }
        },
        labelRenderer(label: string) {
          return `<a href="#${label}" class="mathlabel" title="Permalink to this equation">¶<a>`;
        }
      }
    ];
  }
});
