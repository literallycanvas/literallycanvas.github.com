The ``LiterallyCanvas`` object
==============================

Once initialized, Literally Canvas is controlled and accessed through a
:js:class:`LiterallyCanvas` object. See :doc:`initializing` for information
about getting a reference to this object.

.. js:class:: LiterallyCanvas(containerElement, options)

  :param containerElement: DOM element to put Literally Canvas inside.
  :param options: Dictionary of options. See :doc:`initializing` for possible
                  values.

Changes since v0.3
------------------

The :js:class:`LiterallyCanvas` object no longer uses a single canvas to
render. Instead, it keeps multiple canvases inside a container element.

Methods
-------

Saving and loading
^^^^^^^^^^^^^^^^^^

.. js:function:: loadSnapshotJSON(snapshot)

  :param snapshot: a JSON-encoded string

  Load a drawing.

.. js:function:: getSnapshotJSON()

  :returns: a JSON-encoded string

  Get the current drawing as JSON. Consider its output opaque except when used
  as an argument to :js:func:`loadSnapshotJSON`. You may assume that drawings
  saved with an older version of Literally Canvas will work with a newer one.

  If you need the serialization format to be public, file an issue on GitHub
  and explain your use case.

Exporting images
^^^^^^^^^^^^^^^^

.. js:function:: getImage(options)

  Returns the complete drawing rendered to a canvas, regardless of what the
  view is panned/zoomed to. Available options:

  ``includeWatermark``
    If ``true``, render the watermark behind the drawing.

  ``rect``
    A dict ``{x, y, width, height}`` specifying which part of the image to
    draw, in drawing coordinates (before scaling). Defaults to the bounding
    box of all shapes. If you don't specify a ``rect`` and there are no
    shapes in the drawing, :js:func:`getImage` will return ``undefined``.

  ``scale``
    Amount by which to scale the image output. Shapes will be rendered at
    full resolution. Defaults to ``1``.

  ``scaleDownRetina``
    If ``true``, compensate for ``window.devicePixelRatio`` by adjusting the
    scale before rendering. This is probably what you want, since the image
    will be the same size as what the user sees on their screen, due to being
    scaled back up by the web browser. Defaults to ``true``.

.. js:function:: getSVGString({options})

  Returns the drawing as an SVG string that can be inserted into the DOM or
  downloaded.

  .. warning:: The eraser tool does not affect SVG output.

  ``rect``
    A dict ``{x, y, width, height}`` specifying which part of the image to
    draw, in drawing coordinates. Defaults to the bounding
    box of all shapes. If you don't specify a ``rect`` and there are no
    shapes in the drawing, :js:func:`getSVGString` will return ``undefined``.

.. js:function:: canvasForExport()

  .. deprecated:: 0.4

      Use :js:func:`getImage` instead.

  Returns a canvas object with the current view.

.. js:function:: canvasWithBackground(canvasOrImage)

  .. deprecated:: 0.4

      Use :js:func:`getImage` instead.

  Returns a canvas object with the current view composited over a background
  image.

.. _event_subscription:

Event subscription
^^^^^^^^^^^^^^^^^^

.. code-block:: javascript

  var unsubscribe = lc.on('drawingChange', function() {
    localStorage.setItem('drawing', lc.getSnapshotJSON());
  });
  unsubscribe();  // stop listening

.. js:function:: on(event, callback)

  :returns: a function that unsubscribes from the event

  Attach an event handler to *event*. A common use case is to save the
  drawing when it is changed; see :ref:`saving-and-loading`.

  See :doc:`events` for a list of events.


Controlling the view
^^^^^^^^^^^^^^^^^^^^

.. js:function:: setPan(x, y)

  Move the view's upper left corner to the given position in drawing space.

.. js:function:: setZoom(zoom)

  Set the view zoom to the given value.

.. js:function:: pan(x, y)

  Move the view by the given amount relative to its current position in drawing
  space.

.. js:function:: zoom(amount)

  Add the given amount to the zoom level.

.. js:function:: setImageSize(width, height)

  Change the size of the image away from what was passed to :js:func:`LC.init`
  as :ref:`imageSize <opt-imageSize>`.

Changing the drawing
^^^^^^^^^^^^^^^^^^^^

.. js:function:: saveShape(shape, triggerSaveShapeEvent, previousShapeId)

  :param shape: Shape to be added
  :param triggerSaveShapeEvent:
    If ``true``, trigger the :ref:`shapeSave <event_shapeSave>` event.
    Defaults to ``true``. You may want to set this to ``false`` if you're
    sending and receiving shapes to/from a remote drawing.
  :param previousShapeId:
    ID of the shape just below the new one. Defaults to the most recently
    added shape.

  Add a shape to the drawing. If you're writing a single-user application,
  you should only need to pass the first argument. See :doc:`shapes` for more
  information.

.. js:function:: setColor(colorName, colorValue)

  :param colorName: ``'background'``, ``'primary'``, or ``'secondary'``
  :param colorValue: Any CSS color

.. js:function:: clear()

  Remove all shapes from the drawing.

.. js:function:: undo()

  Undo the last drawing action.

.. js:function:: redo()

  Redo the last thing to be undone.

.. js:function:: setShapesInProgress(shapes)

  Declare a list of shapes that are drawn to the canvas but aren't yet part of
  the drawing. Tools should use this to show shapes in progress.

.. js:function:: drawShapeInProgress(shape)

  Draws the given shape to a buffer without clearing or redrawing anything
  beneath it. If the shape's renderer supports it, only render the most
  recently changed part of the shape.

  This is most useful as an efficient way to draw line paths that the user is
  currently drawing.

Getting information
^^^^^^^^^^^^^^^^^^^

.. js:function:: getColor(colorName)

  Get the value of the ``'primary'``, ``'secondary'``, or ``'background'``
  color.

.. js:function:: getPixel(x, y)

  Get the color of the given drawing-space pixel as a CSS color string.