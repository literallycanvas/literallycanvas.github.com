Backgrounds
===========

You can specify a list of *background shapes* when you initialize Literally
Canvas. Background shapes are not affected by :js:func:`loadSnapshotJSON` or
clearing the canvas. They scroll with the canvas (in contrast to watermarks).

.. note::

   The eraser will erase the background. This problem will be fixed in future
   versions of Literally Canvas.

.. raw:: html
    :file: _background.html

.. literalinclude:: _background.html
    :language: html
    :emphasize-lines: 5-6,11-14
