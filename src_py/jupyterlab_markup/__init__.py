import mimetypes

__version__ = "0.2.1"


# https://www.iana.org/assignments/provisional-standard-media-types/provisional-standard-media-types.xhtml
WASM_EXT = ".wasm"
WASM_MIME = "application/wasm"


def load_jupyter_server_extension(app):
    """ ensure tornado serves `.wasm` files with
    """
    _guess = mimetypes.guess_type

    def guess_type(name, strict=True):
        if name.endswith(WASM_EXT):
            return (WASM_MIME, None)
        return _guess(name, strict)

    mimetypes.guess_type = guess_type
    app.log.warning(
        "[jupyterlab_markup] mimetypes patched to guess: %s => %s",
        WASM_EXT,
        WASM_MIME
    )
