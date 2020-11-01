# jupyterlab-markup

Adds additional rendering support to markdown in JupyterLab by using [markdown-it](https://github.com/markdown-it/markdown-it), and the following plugins:

- [markdown-it-diagrams](https://github.com/agoose77/markdown-it-diagrams)
- [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote)
- [markdown-it-deflist](https://github.com/markdown-it/markdown-it-deflist)
- [markdown-it-replace-link](https://github.com/martinheidegger/markdown-it-replace-link)

![Full example rendering vs markup.](https://i.imgur.com/OL9oGcq.png)
![svgbob rendering](https://i.imgur.com/RbDioU8.gif)
![svgbob rendering](https://i.imgur.com/IQSasVZ.gif)

## Prerequisites

- JupyterLab 2

## Installation

Install extension:

```bash
pip install jupyterlab_markup
jupyter labextension install @agoose77/jupyterlab-markup
```

Ensure the extensions are enabled:

```bash
jupyter labextension list      # should contain @goose/jupyterlab-markup
jupyter serverextension list   # should contain jupyterlab_markup
```

If the serverextension is missing, try...

```bash
jupyter serverextension enable jupyterlab_markup
```

## Contributing

Please see the [contributor guide](./CONTRIBUTING.md)!

## Examples

### mermaid

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

### svgbob

```bob
     .---.
    /-o-/--
 .-/ / /->
( *  \/
 '-.  \
    \ /
     '
```
