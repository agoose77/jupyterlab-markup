""" Server companion of jupyterlab-markup

    For now, just ensures .wasm files can be served correctly on older
    pythons/notebook server, but will eventually handle:
    - labextension assets
    - nbconvert processors
    - test utilities
"""
import mimetypes

__version__ = "0.2.1"


def load_jupyter_server_extension(app):
    """ Ensure tornado serves `.wasm` files with correct MIME
    """
    # python >3.7.n (where in is > 0, or something) already has this
    # as will some future releases of notebook and jupyter_server, but...s
    mimetypes.add_type("application/wasm", ".wasm")
