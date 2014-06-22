Exporting images
================

Regardless of what's displayed in the viewport, you can export the complete
drawing, or any subset of the drawing, using :js:func:`getImage`.

These examples export your drawing as a PNG in a new window.

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
