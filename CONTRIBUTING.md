## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
python -m pip install -e .
jupyter serverextension enable jupyterlab_markup
jlpm --ignore-optional
jlpm build
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

Additional [`markdown-it` plugins][plugins]
can be added as small labextensions. After getting started with the [official cookiecutter][],
your `plugin.ts` might look something like:

```ts
import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import { IMarkdownIt } from '@agoose77/jupyterlab-markup';

const plugin: JupyterFrontEndPlugin<void> = {
  id: `@your/package:deflist`,
  autoStart: true,
  requires: [IMarkdownIt],
  activate: (app: JupyterFrontEnd, markdownIt: IMarkdownIt) => {
    markdownIt.addPluginProvider('markdown-it-deflist', async () => {
      // _please_ lazy load to avoid bloating the main vendor bundle!
      const deflistPlugin = await import(
        /* webpackChunkName: "markdown-it-deflist" */ 'markdown-it-deflist'
      );
      return deflistPlugin.default;
    });
  },
};

export default [plugin];
```

[official cookiecutter]: https://github.com/jupyterlab/extension-cookiecutter-ts
[plugins]: https://www.npmjs.com/search?q=keywords:markdown-it-plugin
