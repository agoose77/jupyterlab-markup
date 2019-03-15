# jupyterlab-markup

Adds additional markdown rendering support to markdown in JupyterLab by using [Markdown-It](https://github.com/markdown-it/markdown-it), [svgbob](https://github.com/ivanceras/svgbob), and [mermaidjs](https://github.com/knsv/mermaid).

Note - at the moment, this marks all markdown as _trusted_, which is not ideal. We could either enable sanitisation at the Markdown-It level, which acts only on the `html_block` and `html_inline` tags, or extend the tags supported in the Jupyterlab sanitiser.


## Prerequisites

* JupyterLab

## Installation

```bash
jupyter labextension install jupyterlab-markup
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
npm run build
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```

