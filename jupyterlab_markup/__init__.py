from ._version import __version__, LABEXTENSION_NAME


def _jupyter_labextension_paths():
    return [{"src": "labextension", "dest": LABEXTENSION_NAME}]
