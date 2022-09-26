# Configuring

`jupyterlab-markup` is confiugured through the JupyterLab _Advanced Settings Editor_
user interface, as well as a few custom interfaces.

## Enabling or disabling extensions

Different `jupyterlab-markup` plugins can be enabled or disabled using the _Settings
&raquo; Markdown Mermaid Extensions..._ from the JupyterLab main menu.

## Configuring `markdown-it`

A number of global `markdown-it` settings can be configured by:

- opening the _Settings &raquo; Advanced Settings Editor_
- opening the _Markdown Extensions_ section

## Configuring Plugins

Due to the variety of options accepted by plugins, configuring plugins requires opening
the _JSON Settings Editor_. Individual plugins can be configured in the _JSON Settings
Editor_.

Some plugins offer a number of interesting options.

For example, `@agoose77/markdown-it-mermaid` accepts a single argument, the input to
[`Mermaid.initialize`][mermaid-configuration]. As a small example, To change the
MermaidJS theme:

[mermaid-configuration]: https://mermaid-js.github.io/mermaid/#/Setup?id=configuration

```json
{
  "plugin-options": {
    "@agoose77/markdown-it-mermaid": [{ "theme": "forest" }]
  }
}
```

```{hint}
You may need to reload the page after changing plugin settings.
```

## Exporting options

`jupterlab-markup` options can be configured for use in specific use cases, such as
Binder and JupyterLite demos with an [`overrides.json`][overrides].

[overrides]:
  https://jupyterlab.readthedocs.io/en/stable/user/directories.html#overrides-json

The example above would be:

```json
{
  "@agoose77/juptyerlab-markup": {
    "plugin-options": {
      "@agoose77/markdown-it-mermaid": [{ "theme": "forest" }]
    }
  }
}
```

## Settings Schema

```{jsonschema} ../schema/core.json
:lift_description:
:lift_definitions:
:auto_reference:
```
