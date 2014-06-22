Images
======

You may want to refer to the :doc:`shape API <../api/shapes>` for specifics
about creating shapes, including images.

As the background
-----------------

You can specify a list of *background shapes* when you initialize Literally
Canvas. Background shapes are not affected by the eraser,
:js:func:`loadSnapshotJSON`, or clearing the canvas.

.. raw:: html
    :file: _background.html

.. literalinclude:: _background.html
    :language: html
    :emphasize-lines: 5-6,11-19

As the watermark
----------------

The *watermark image* is a special image that is like a background shape,
except it doesn't pan with the drawing and is centered at all times. It allows
you to add branding to your drawing widget.

.. raw:: html
    :file: _watermark.html

.. literalinclude:: _watermark.html
    :language: html
    :emphasize-lines: 5-6,10-11

As part of the drawing
----------------------

Literally Canvas does not yet provide a UI for adding images, but you can add
them programmatically.

.. raw:: html
    :file: _adding_images.html

.. literalinclude:: _adding_images.html
    :language: html
    :emphasize-lines: 7-9
