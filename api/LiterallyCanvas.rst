The ``LiterallyCanvas`` object
==============================

Once initialized, Literally Canvas is controlled and accessed through a
:js:class:`LiterallyCanvas` object. See :doc:`initializing` for information
about getting a reference to this object.

.. js:class:: LiterallyCanvas(containerElement, options)

  :param containerElement: DOM element to put Literally Canvas inside.
  :param options: Dictionary of options. See :doc:`initializing` for possible
                  values.

Methods
-------

Saving and loading
^^^^^^^^^^^^^^^^^^

.. js:function:: loadSnapshotJSON(snapshot)

  Load a JSON-encoded drawing.

.. js:function:: getSnapshotJSON()

  Get the current drawing as JSON. Consider its output opaque and unstable
  except when used as an argument to :js:func:`loadSnapshotJSON`.

  If you need the serialization format to be stable, file an issue on GitHub.

Exporting images
^^^^^^^^^^^^^^^^

.. js:function:: getImage(options)

  Returns the complete drawing rendered to a canvas, regardless of what the
  view is panned/zoomed to. Available options:

  ``rect``
    A dict ``{x, y, width, height}`` specifying which part of the image to
    draw, in drawing coordinates (before scaling). Defaults to the bounding
    box of all shapes.

  ``scale``
    Amount by which to scale the image output. Shapes will be rendered at
    full resolution. Defaults to ``1``.

  ``includeWatermark``
    If ``true``, render the watermark behind everything. Defaults to ``false``.

  ``scaleDownRetina``
    If ``true``, compensate for ``window.devicePixelRatio`` by adjusting the
    scale before rendering. This is probably what you want, since the image
    will be the same size as what the user sees on their screen, due to being
    scaled back up by the web browser. Defaults to ``true``.

.. js:function:: canvasForExport()

  .. deprecated:: 0.4

      Use :js:func:`getImage` instead.

  Returns a canvas object with the current view.

.. js:function:: canvasWithBackground(canvasOrImage)

  .. deprecated:: 0.4

      Use :js:func:`getImage` instead.

  Returns a canvas object with the current view composited over a background
  image.

Events
^^^^^^

.. js:function:: on(event, callback)

  Attach an event handler to *event*. A common use case is to save the
  drawing when it is changed; see :ref:`saving-and-loading`.

  See :ref:`events` for a list of events.

.. TODO: document unsubscribe


Controlling the view
^^^^^^^^^^^^^^^^^^^^

.. TODO: document [set]pan, [set]zoom

Implementing tools
^^^^^^^^^^^^^^^^^^

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
