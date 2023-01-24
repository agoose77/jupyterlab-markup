# jupyterlab-markup

[![pypi-badge]][pypi] [![conda-forge-badge]][conda-forge] [![docs-badge]][docs]
[![binder-badge]][binder] [![ci-badge]][ci]

> Extensible markdown rendering for [JupyterLab], powered by [markdown-it].

This extension is composed of:

- a Python package named `jupyterlab_markup`
- an NPM package named `@agoose77/jupyterlab-markup` for the frontend extension.

For more, see the [documentation][docs].

## Requirements

- JupyterLab >=3.0
- Python >=3.7

## Install

With `pip`:

```bash
pip install jupyterlab_markup
```

or `conda`/`mamba`:

```bash
conda install -c conda-forge jupyterlab-markup
```

> For a development installation, see the [contributing guide].

[contributing guide]:
  https://github.com/agoose77/jupyterlab-markup/blob/main/CONTRIBUTING.md

## Troubleshoot

Check the frontend extension is installed:

```bash
jupyter labextension list
```

## Uninstall

```bash
pip uninstall jupyterlab-markup
```

or

```bash
conda uninstall jupyterlab-markup
```

[docs-badge]: https://readthedocs.org/projects/jupyterlab-markup/badge/?version=latest
[docs]: https://jupyterlab-markup.rtfd.io
[binder-badge]: https://mybinder.org/badge_logo.svg
[binder]: https://mybinder.org/v2/gh/agoose77/jupyterlab-markup.git/main?urlpath=lab
[pypi-badge]: https://img.shields.io/pypi/v/jupyterlab-markup
[pypi]: https://pypi.org/project/jupyterlab-markup
[conda-forge-badge]: https://img.shields.io/conda/vn/conda-forge/jupyterlab-markup
[conda-forge]: https://anaconda.org//conda-forge/jupyterlab-markup
[ci-badge]:
  https://github.com/agoose77/jupyterlab-markup/actions/workflows/ci.yml/badge.svg
[ci]: https://github.com/agoose77/jupyterlab-markup/actions/workflows/ci.yml
[markdown-it]: https://github.com/markdown-it/markdown-it
[jupyterlab]: https://github.com/jupyterlab/jupyterlab
