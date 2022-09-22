"""documentation for jupyterlite"""
import datetime
import json
import os
import subprocess
import sys
import tomli
from pathlib import Path

from sphinx.application import Sphinx

os.environ.update(IN_SPHINX="1")

CONF_PY = Path(__file__)
HERE = CONF_PY.parent
ROOT = HERE.parent
DIST = ROOT / "dist"
DEMO = ROOT / "demo"
PYPROJ = ROOT / "pyproject.toml"
APP_PKG = ROOT / "package.json"
PROJ_DATA = tomli.loads(PYPROJ.read_text(encoding="utf-8"))
APP_DATA = json.loads(APP_PKG.read_text(encoding="utf-8"))
RTD = json.loads(os.environ.get("READTHEDOCS", "False").lower())

# metadata
author = APP_DATA["author"]
project = PROJ_DATA["project"]["name"]
copyright = f"{datetime.date.today().year}, {author}"

# The full version, including alpha/beta/rc tags
release = APP_DATA["version"]

# The short X.Y version
version = ".".join(release.rsplit(".", 1))

# sphinx config
extensions = [
    # first-party sphinx extensions
    "sphinx.ext.todo",
    "sphinx.ext.autosectionlabel",
    "myst_parser",
    "sphinx_copybutton",
]

autosectionlabel_prefix_document = True
myst_heading_anchors = 3
suppress_warnings = ["autosectionlabel.*"]

# files
# rely on the order of these to patch json, labextensions correctly
html_static_path = [
    # docs stuff
    "_static",
    # as-built application
    "../build/demo",
]
html_css_files = [
    "theme.css",
]

exclude_patterns = [
    "_build",
    ".ipynb_checkpoints",
    "**/.ipynb_checkpoints",
    "**/~.*",
    "**/node_modules",
    "babel.config.*",
    "jest-setup.js",
    "jest.config.js",
    "test/",
    "tsconfig.*",
    "webpack.config.*",
]

# theme
html_theme = "pydata_sphinx_theme"
html_theme_options = {
    "github_url": APP_DATA["homepage"],
    "use_edit_page_button": True,
}

html_context = {
    "github_user": "agoose77",
    "github_repo": "jupyterlab-markup",
    "github_version": "main",
    "doc_path": "docs",
}

html_sidebars = {
  "**": []
}

def ensure_wheel():
    """Build a wheel, if needed."""
    wheels = sorted(DIST.glob("*.whl"))
    if not wheels:
        subprocess.check_call(["pyproject-build", ".", "--wheel", "--no-isolation"], cwd=ROOT)
        wheels = sorted(DIST.glob("*.whl"))
    return wheels[-1]

def setup(app):
    """Do some prep work to ensure the demo is built."""
    wheel = ensure_wheel()
    subprocess.check_call([
        "jupyter", "lite", "build", f"--LiteBuildConfig.federated_extensions={wheel}",
    ], cwd=DEMO)
