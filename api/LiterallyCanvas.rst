The ``LiterallyCanvas`` object
==============================

Once initialized, Literally Canvas is controlled and accessed through a
:js:class:`LiterallyCanvas` object. See :doc:`initializing` for information
about getting a reference to this object.

.. js:class:: LiterallyCanvas(containerElement, options)

  Controller object for a canvas. Accessible as the argument to the ``onInit``
  callback option on ``$('.literally').literallycanvas()``.

  .. code-block:: javascript

      $('.literally').literallycanvas({
          onInit: function(lc) {
            // do stuff
          }
      });

  .. js:function:: canvasForExport()

    Get a canvas object with the fully rendered drawing. This canvas is zoomed
    and cropped to the current view. See :ref:`exporting-images` for an
    example.

    .. note::

        Many image uploading services support base64-encoded data. You can get that
        data this way:

        .. code-block:: javascript

            lc.canvasForExport().toDataURL().split(',')[1]

  .. js:function:: canvasWithBackground(canvasOrImage)

    Get a canvas object with the fully rendered drawing on top of the given image. The resulting canvas completely fits both images.

  .. js:function:: loadSnapshotJSON(snapshot)

    Load a JSON-encoded drawing.

  .. js:function:: getSnapshotJSON()

    Get the current drawing as JSON. Consider its output opaque and unstable
    except when used as an argument to :js:func:`loadSnapshotJSON`.

  .. js:function:: on(event, callback)

    Attach an event handler to *event*. A common use case is to save the
    drawing when it is changed; see :ref:`saving-and-loading`.

    See :ref:`events` for a list of events.

  .. js:function:: repaint(dirty = true, drawBackground = false)

    :param dirty: If ``true``, redraw all shapes rather than just the topmost.
    :param drawBackground: If ``true``, draw the background as a solid
                           rectangle. Otherwise, don't draw a background.
                           Typically you only need to draw the background when
                           exporting the image. Otherwise, the background color
                           set by the CSS on the canvas element will be
                           visible.

  .. js:function:: saveShape(shape)

    Add a shape to the drawing. See :ref:`list-shapes` for a current list of
    shapes.

  .. js:function:: numShapes()

    The number of shapes in the drawing.
