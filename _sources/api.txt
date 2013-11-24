API
===

``LiterallyCanvas``
-------------------

.. js:class:: LiterallyCanvas

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

.. _events:

Events
------

Drawing changes
^^^^^^^^^^^^^^^

=============== ===================================
clear           The drawing was cleared
drawingChange   The drawing was updated in some way
redo            The drawing changed due to a redo
undo            The drawing changed due to an undo
=============== ===================================

Operations
^^^^^^^^^^

In the order that they occur:

=============== ===========================================
drawStart       A new shape is being drawn
drawContinue    The new shape is being modified
drawEnd         The new shape is complete
shapeSave       The new shape has been saved to the drawing
=============== ===========================================

View changes
^^^^^^^^^^^^

=============== ========================
pan             The canvas was panned
repaint         The canvas was repainted
toolChange      A different tool was set
zoom            The canvas was zoomed
=============== ========================

.. _list-shapes:

Shapes
------

.. js:class:: LC.ImageShape(x, y, image, locked = false)

  :param image: :js:class:`Image`
  :param locked: Preserve this shape when the drawing is cleared

.. js:class:: LC.Rectangle(x, y, strokeWidth, strokeColor, fillColor)

.. js:class:: LC.Line(x1, y1, x2, y2, strokeWidth, strokeColor, fillColor)

.. js:class:: LC.LinePathShape(points = [], order = 3, tailSize = 3)

    :param order: Order of the bspline applied to the curve. Higher values make
                  the curve smoother but are more expensive.
    :param tailSize: The number of segments to use as the tail. In other words,
                     when a point is added, how many points you need to go back
                     before the slope of the old smoothed curve is the same as
                     the slope of the new smoothed curve.
    
.. js:class:: LC.EraseLinePathShape(points = [], order = 3, tailSize = 3)

    Same as :js:class:`LC.LinePathShape`, but erases when drawn instead of
    drawing a line.

Adding tools
------------

Inspect :file:`coffee/core/tools.coffee` and
:file:`coffee/core/widgets.coffee` in the source code.
