The ``LiterallyCanvas`` object
==============================

Once initialized, Literally Canvas is controlled and accessed through a
:js:class:`LiterallyCanvas` object. See :doc:`initializing` for information
about getting a reference to this object.

.. js:class:: LiterallyCanvas(containerElement, options)

  :param containerElement: DOM element to put Literally Canvas inside.
  :param options: Dictionary of options. See :doc:`initializing` for possible
                  values.

.. note::

    As of v0.4, the :js:class:`LiterallyCanvas` object no longer uses a single
    canvas to render. Instead, it keeps multiple canvases inside a container
    element.

.. js:attribute:: opts

    A copy of the options passed to :js:func:`LC.init` with the defaults filled
    in. For example, if you were to implement your own tool that used a stroke
    width, you'd want to set your initial value to
    ``lc.opts.defaultStrokeWidth``.
    
Saving and loading
------------------

.. js:function:: getSnapshot(keys=['shapes', 'imageSize', 'colors', 'position', 'scale', 'backgroundShapes'])

  :param keys: Whitelist of state to save

  :returns: a snapshot object

  .. versionadded:: 0.4.9

  Returns the state of the drawing as a JSON-encodable object. This currently
  includes the shapes, background shapes, colors, image size, pan position,
  and scale. If you don't want to restore all of those things, you may pass
  **keys** to specify exactly what you want.

  To get a snapshot that matches version 0.4.8's format, which is a strict
  subset of 0.4.9+'s, you can do this::

      lc.getSnapshot(['shapes', 'colors'])

  The snapshot format is stable across versions.


.. js:function:: loadSnapshot(snapshot)

  :param snapshot: a snapshot object

  .. versionadded:: 0.4.9

  Replace the current state with whatever is in **snapshot**.


.. js:function:: getSnapshotJSON()

  :returns: a JSON-encoded string

  .. deprecated:: 0.4.9

      Use ``JSON.stringify(lc.getSnapshot())`` instead.

  Alias for ``JSON.stringify(lc.getSnapshot())``.

  This will continue to work until version 0.6.


.. js:function:: loadSnapshotJSON(snapshotJSON)

  :param snapshotJSON: a JSON-encoded string

  .. deprecated:: 0.4.9

      Use ``lc.loadSnapshot(JSON.parse(snapshotJSON))`` instead.

  Alias for ``lc.loadSnapshot(JSON.parse(snapshotJSON))``\.

  This will continue to work until version 0.6.

Exporting images
----------------

.. js:function:: getImage(options)

  Returns the complete drawing rendered to a canvas, regardless of what the
  view is panned/zoomed to. This method has the same options as
  :js:func:`LC.renderSnapshotToImage`, as well as:

  ``includeWatermark``
    If ``true``, render the watermark behind the drawing.

  ``scaleDownRetina``
    If ``true``, compensate for ``window.devicePixelRatio`` by adjusting the
    scale before rendering. This is probably what you want, since the image
    will be the same size as what the user sees on their screen, due to being
    scaled back up by the web browser. Defaults to ``true``.

.. js:function:: getSVGString({options})

  Returns the drawing as an SVG string that can be inserted into the DOM or
  downloaded.

  This method has the same options as :js:func:`LC.renderSnapshotToSVG`.

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
------------------

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
--------------------

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
--------------------

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

.. js:function:: setWatermarkImage(image)

  Set or replace the watermark image behind the drawing. See the
  :ref:`watermarkImage <opt-watermarkImage>` option.

Getting information
-------------------

.. js:function:: getColor(colorName)

  Get the value of the ``'primary'``, ``'secondary'``, or ``'background'``
  color.

.. js:function:: getPixel(x, y)

  Get the color of the given drawing-space pixel as a CSS color string.

.. js:function:: getDefaultImageRect(explicitSize={width: 0, height: 0}, margin={top: 0, right: 0, bottom: 0, left: 0})
  
  Returns the effective bounds of the canvas. Mostly used as a convenient way
  to limit the scope of a potentially infinite tool. (For example, a paint
  bucket shouldn't fill infinite pixels.)

Teardown
--------

.. js:function:: teardown()

  Completely remove this instance of Literally Canvas from the web page.
