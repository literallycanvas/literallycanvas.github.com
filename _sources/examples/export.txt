.. _exporting-images:

Exporting to PNG
================

Internally, Literally Canvas uses more than one canvas to draw efficiently. You
can use :js:func:`LiterallyCanvas.canvasForExport` to get a fully rendered
canvas object, which you can use as needed to export your image. This example
exports your drawing as a PNG in a new window.

.. raw:: html
    :file: _export.html

.. literalinclude:: _export.html
    :language: html
    :emphasize-lines: 15
