""" Server companion of jupyterlab-markup

    For now, just ensures .wasm files can be served correctly on older
    pythons/notebook server, but will eventually handle:
    - labextension assets
    - nbconvert processors
    - test utilities
"""
import mimetypes
import json
import os.path as osp

from ._version import __version__

HERE = osp.abspath(osp.dirname(__file__))

with open(osp.join(HERE, 'labextension', 'package.json')) as fid:
    data = json.load(fid)

def _jupyter_labextension_paths():
    return [{
        'src': 'labextension',
        'dest': data['name']
    }]


def _jupyter_server_extension_points():
    return [{
        "module": "jupyterlab_markup"
    }]


def _load_jupyter_server_extension(app):
    """ Ensure tornado serves `.wasm` files with correct MIME
    """
    # python >3.7.n (where in is > 0, or something) already has this
    # as will some future releases of notebook and jupyter_server, but...s
    mimetypes.add_type("application/wasm", ".wasm")
