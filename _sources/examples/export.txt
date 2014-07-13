Exporting images
================

Regardless of what's displayed in the viewport, you can export the complete
drawing, or any subset of the drawing, using :js:func:`getImage`.

These examples export your drawing as a PNG in a new window. The conversion
to PNG is handled by the built-in canvas function :js:func:`toDataURL`.
To learn more about what image formats are available, refer to
`Mozilla's canvas element reference <https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement>`_.

Exporting the bounding rect of all shapes
-----------------------------------------

.. raw:: html
    :file: _export.html

.. literalinclude:: _export.html
    :language: html
    :emphasize-lines: 12

Exporting a specific rectangle
------------------------------

This is probably what you want to do if your image bounds are not infinite.

.. raw:: html
    :file: _export_bounded.html

.. literalinclude:: _export_bounded.html
    :language: html
    :emphasize-lines: 9-12,15,20
