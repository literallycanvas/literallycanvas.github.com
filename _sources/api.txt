API
===

Creating a canvas
-----------------

.. code-block:: javascript

  $('.literally').literallycanvas({options});

.. js:function:: $.literallycanvas(options)

    :param imageURLPrefix: Location of Literally Canvas's ``img/`` folder.

                           .. note:: You probably need to set this.

    :param onInit: This callback is a convenient place to set up event
                   handlers, programmatically add shapes, or otherwise
                   integrate with your application.

                   :ref:`saving-and-loading` has an example of how you might
                   use this option.
    :type onInit: function(:js:class:`LiterallyCanvas`)

    :param primaryColor: Starting stroke color. Defaults to ``'#000'``.
    :param secondaryColor: Starting fill color. Defaults to ``'#fff'``.
    :param backgroundColor: Starting background color. Defaults to
                            ``'transparent'``.
    :param keyboardShortcuts: Enable panning with the arrow keys. Defaults to
                              ``true``.

    :param preserveCanvasContents:
        If ``true``, preserve the contents of the canvas as part of the
        drawing.

        .. code-block:: javascript

            var ctx = $('canvas').get(0).getContext('2d');
            ctx.fillStyle = 'rgb(255,255,0)';
            ctx.fillRect(0, 0, 300, 300);
            $('.literally').literallycanvas({preserveCanvasContents: true});

        .. note::

            This feature is somewhat experimental. It doesn't attempt to preserve
            the original image's scale. Suggestions and patches are welcome.

    :param toolClasses:
        A list of tools to enable. The default value is:

        .. code-block:: javascript

            [LC.PencilWidget, LC.EraserWidget, LC.LineWidget,
             LC.RectangleWidget, LC.PanWidget, LC.EyeDropperWidget]

        If you need to disable a tool (such as pan), you can remove it from the
        above list and pass the remainder as ``toolClasses``.

        .. code-block:: javascript

            $('.literally').literallycanvas({
                // disable panning
                keyboardShortcuts: false,
                toolClass: [LC.PencilWidget, LC.EraserWidget, LC.LineWidget,
                            LC.RectangleWidget, LC.EyeDropperWidget]
            });

        .. note::

            This simplistic API will likely change in favor of one that doesn't
            expose so much internal information.

    :param watermarkImage:
        An image to display behind the drawing. The image will be centered and
        not scaled. It will not pan with the drawing.

        .. code-block:: javascript

            var img = new Image()
            img.src = '/static/img/watermark.png'
            $('.literally').literallycanvas({watermarkImage: img});

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

    .. note::

        Many image uploading services support base64-encoded data. You can get that
        data this way:

        .. code-block:: javascript

            lc.canvasForExport().toDataURL().split(',')[1]

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

Inspect :file:`coffee/core/tools.coffee` and :file:`coffee/core/widgets.coffee`
in the source code. We haven't had time to write this section of the docs yet.
