.. _adding-images:

Adding images
=============

You can add images to a drawing programmatically. Literally Canvas does not yet
provide a UI for adding images.

.. raw:: html
    :file: _adding_images.html

.. literalinclude:: _adding_images.html
    :language: html
    :emphasize-lines: 9-11

With saving and loading
-----------------------

If you also use saving and loading, you'll want to make sure your drawing is
empty before adding a background to it. Otherwise, you'll end up with a new
duplicate of your background image each time you load it. The example below
saves to ``localStorage`` and includes a background image.

Preventing the image from being deleted
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you play with the previous example, you may notice that you can delete the
image using Clear or Undo. To prevent that from happening, pass ``locked=true``
to ``ImageShape()``.

.. raw:: html
    :file: _adding_images_with_loading.html

.. literalinclude:: _adding_images_with_loading.html
    :language: html
    :emphasize-lines: 16-22
