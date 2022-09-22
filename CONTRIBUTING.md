## Contributing

> Note: You will need NodeJS to build the extension package.

### Get Started

The `jlpm` command is JupyterLab's pinned version of [yarn](https://yarnpkg.com/) that
is installed with JupyterLab. You may use `yarn` or `npm` in lieu of `jlpm` below.

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

### Watching Sources

You can watch the source directory and run JupyterLab at the same time in different
terminals to watch for changes in the extension's source and automatically rebuild the
extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and
available in your running JupyterLab. Refresh JupyterLab to load the change in your
browser (you may need to wait several seconds for the extension to be rebuilt).

## Extending

Additional [`markdown-it` plugins][plugins] can be added as small labextensions. After
getting started with the [official cookiecutter], your `plugin.ts` might look something
like the the [builtins], which use the `simpleMarkdownItPlugin` boilerplate [wrapper].

[builtins]: https://github.com/agoose77/jupyterlab-markup/tree/main/src/builtins
[wrapper]: https://github.com/agoose77/jupyterlab-markup/blob/main/src/utils.ts
[official cookiecutter]: https://github.com/jupyterlab/extension-cookiecutter-ts
[plugins]: https://www.npmjs.com/search?q=keywords:markdown-it-plugin
