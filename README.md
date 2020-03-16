# jupyterlab-markup

Adds additional rendering support to markdown in JupyterLab by using [markdown-it](https://github.com/markdown-it/markdown-it), and the following plugins:

* [markdown-it-diagrams](https://github.com/agoose77/markdown-it-diagrams)
* [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote)
* [markdown-it-deflist](https://github.com/markdown-it/markdown-it-deflist)


![Full example rendering vs markup.](https://i.imgur.com/OL9oGcq.png)
![svgbob rendering](https://i.imgur.com/RbDioU8.gif)
![svgbob rendering](https://i.imgur.com/IQSasVZ.gif)


## Prerequisites

* JupyterLab

## Installation

Ensure mimetype exists for wasm:
```bash
echo "application/wasm      wasm" | sudo tee -a /etc/mime.types
```

Install extension:
```bash
jupyter labextension install @agoose77/jupyterlab-markup
```

You will need to reinstall the extension if you do these steps out of order.

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

``` mermaid 
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
``` bob 
     .---.
    /-o-/--
 .-/ / /->
( *  \/
 '-.  \
    \ /
     '
```