## Development

For a development install (requires npm version 4 or later), do the following in
the repository directory:

```bash
python -m pip install -e .
jupyter serverextension enable jupyterlab_markup
jlpm bootstrap
jupyter labextension install .
```

To rebuild the package and the JupyterLab app:

```bash
jlpm build
jupyter lab build
```

For live development

```bash
jlpm watch           # will continue running
jupyter lab watch    # in another terminal, will continue running
```

## Extending

Additional [`markdown-it` plugins][plugins] can be added as small labextensions.
After getting started with the [official cookiecutter][], your `plugin.ts` might
look something like the the [builtins](./src/builtins/), which use the
`simpleMarkdownItPlugin` boilerplate [wrapper](./src/utils.ts).

[official cookiecutter]: https://github.com/jupyterlab/extension-cookiecutter-ts
[plugins]: https://www.npmjs.com/search?q=keywords:markdown-it-plugin
