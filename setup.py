#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
from jupyter_packaging import get_data_files
from setuptools import setup
import pathlib
import json

# Add labextension target to data_files
HERE = pathlib.Path.cwd().absolute()
EXT_SOURCE_PATH = HERE / "jupyterlab_markup" / "labextension"
EXT_DEST_PATH = (
    pathlib.PurePath("share")
    / "jupyter"
    / "labextensions"
    / "@agoose77"
    / "jupyterlab-markup"
)

VERSION = json.loads((HERE / "package.json").read_text())['version']
setup(
    version=VERSION,
    data_files=get_data_files(
        [
            (EXT_DEST_PATH, EXT_SOURCE_PATH, "**"),
            (EXT_DEST_PATH, HERE, "install.json"),
        ]
    )
)
