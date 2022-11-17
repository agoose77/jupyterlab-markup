# jupyterlab_markup

[![pypi-badge][]][pypi] [![binder-badge][]][binder] [![ci-badge][]][ci]

[binder-badge]: https://mybinder.org/badge_logo.svg
[binder]: https://mybinder.org/v2/gh/agoose77/jupyterlab-markup.git/main?urlpath=lab
[pypi-badge]: https://img.shields.io/pypi/v/jupyterlab-markup
[pypi]: https://pypi.org/project/jupyterlab-markup
[ci-badge]: https://github.com/agoose77/jupyterlab-markup/actions/workflows/ci.yml/badge.svg
[ci]: https://github.com/agoose77/jupyterlab-markup/actions/workflows/ci.yml

A JupyterLab extension to enable markdown-it rendering, with support for markdown-it plugins

This extension is composed of a Python package named `jupyterlab_markup`
for the server extension and a NPM package named `@agoose77/jupyterlab-markup`
for the frontend extension.

## Requirements

- JupyterLab >= 3.0

## Install

```bash
pip install jupyterlab_markup
```

## Troubleshoot

If you are seeing the frontend extension, but it is not working, check
that the server extension is enabled:

```bash
jupyter server extension list
```

If the server extension is installed and enabled, but you are not seeing
the frontend extension, check the frontend extension is installed:

```bash
jupyter labextension list
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_markup directory
# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm run build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Uninstall

```bash
pip uninstall jupyterlab_markup
```
