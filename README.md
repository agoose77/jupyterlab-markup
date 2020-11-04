# jupyterlab-markup

[![npm-badge][]][npm] [![pypi-badge][]][pypi] [![binder-badge][]][binder]

[binder]:
  https://mybinder.org/v2/gh/agoose77/jupyterlab-markup/master?urlpath=lab%2Ftree%2Findex.ipynb
[binder-badge]: https://mybinder.org/badge_logo.svg
[npm-badge]: https://img.shields.io/npm/v/@agoose77/jupyterlab-markup
[npm]: https://www.npmjs.com/package/@agoose77/jupyterlab-markup
[pypi-badge]: https://img.shields.io/pypi/v/jupyterlab_markup
[pypi]: https://pypi.org/project/jupyterlab_markup

Adds additional rendering support to markdown in JupyterLab by using
[markdown-it](https://github.com/markdown-it/markdown-it), and the following
plugins:

- [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor)
- [markdown-it-deflist](https://github.com/markdown-it/markdown-it-deflist)
- [markdown-it-diagrams](https://github.com/agoose77/markdown-it-diagrams)
- [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote)
- [markdown-it-task-lists](https://github.com/revin/markdown-it-task-lists)
  ![Full example rendering vs markup.](https://i.imgur.com/OL9oGcq.png)
  ![svgbob rendering](https://i.imgur.com/RbDioU8.gif)
  ![svgbob rendering](https://i.imgur.com/IQSasVZ.gif)

## Prerequisites

- JupyterLab 2

## Limitations

Most custom markdown extensions not covered by the default `marked`-based
renderer (e.g. task lists, header anchors) will not work for others who do not
have this extension installed. Markdown is very lenient, so no data should be
_lost_, but it might look strange.

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

## Usage

After [installing](#Installation) the extension (and restarting/reloading
JupyterLab), all plugins will be enabled by default.

All plugins (and `markdown-it` itself) can be disabled via the _Command Palette_
or under the
[_Settings_ menu](https://jupyterlab.readthedocs.io/en/stable/user/interface.html#menu-bar)
with _Use Markdown Extensions_. This will not affect existing renderers, so open
documents will need to be reopened.

Individual plugins can be previewed, enabled/disabled from the palette or menu
under _Markdown Extension Settings..._. This view also provides links and
examples of any features added by the extensions.

### Advanced

A number of settings can be configured through the JupyterLab _Advanced Settings
Editor_, including plugin and `markdown-it` options. As with the above
[limitations](#Limitations), heavy customization might make your documents look
strange.

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
