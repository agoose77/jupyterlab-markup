#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
from jupyter_packaging import get_data_files
from setuptools import setup
import pathlib

# Add labextension target to data_files
source_path = pathlib.Path("jupyterlab_markup") / "labextension"
dest_path = pathlib.PurePath("share") / "jupyter" / "labextensions" / "@agoose77" / "jupyterlab-markup"
data_files_spec = [
    (dest_path, source_path.absolute(), "**"),
]

setup(data_files=get_data_files(data_files_spec))
