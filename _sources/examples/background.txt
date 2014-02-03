Backgrounds
===========

Affected by eraser
------------------

You can specify a list of *background shapes* when you initialize Literally
Canvas. Background shapes are not affected by :js:func:`loadSnapshotJSON` or
clearing the canvas. They scroll with the canvas (in contrast to watermarks).

.. note::

   The eraser will erase the background. The second example on this page demonstrates how to have a background that isn't affected by the eraser.

.. raw:: html
    :file: _background.html

.. literalinclude:: _background.html
    :language: html
    :emphasize-lines: 5-6,11-14

Not affected by eraser
----------------------

Since Literally Canvas doesn't have internal support for backgrounds that are unaffected by the eraser tool, you'll have to render your background into another DOM element to achieve that effect. You'll then have to combine the background and LC canvases into one when you want to export the image.

.. raw:: html
    :file: _separate_background.html

.. literalinclude:: _separate_background.html
    :language: html
