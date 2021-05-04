__all__ = ["__version__", "LABEXTENSION_VERSION", "LABEXTENSION_NAME"]

import json
import pathlib


def _load_package_info():
    package_json_path = pathlib.Path(__file__).parent / "labextension" / "package.json"
    with open(package_json_path) as f:
        return json.load(f)


_package_info = _load_package_info()

LABEXTENSION_NAME = _package_info["name"]
LABEXTENSION_VERSION = _package_info["version"]

__version__ = LABEXTENSION_VERSION
