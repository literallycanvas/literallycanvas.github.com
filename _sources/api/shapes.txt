Shapes
======

A drawing is composed of *shapes*. Shapes are added either by tools or by you,
programmatically. All shapes are created through the
:js:func:`LC.createShape` function.

A "color" is a CSS color string.

Creating shapes
---------------

.. note:: This section might be out of date. Read the source.

.. _shape-Image:

.. js:function:: LC.createShape('Image', {x, y, image})

  :param x/y: Upper left corner position
  :param scale: Scale of the image. Defaults to 1.0.
  :param image: A DOM `Image` object

  .. note::

    If you'd like to add an ``image.onload`` callback, **do not assign it
    directly!** This will break several things. Instead, use
    :js:func:`LC.util.addImageOnload`.

.. _shape-Rectangle:

.. js:function:: LC.createShape('Rectangle', {x, y, width, height, strokeWidth, strokeColor, fillColor})

  :param x/y: Upper left corner position
  :param width/height: Size of the rectangle
  :param strokeWidth: Width of the border
  :param strokeColor: Color of the border
  :param fillColor: Color of the middle

.. _shape-Line:

.. js:function:: LC.createShape('Line', {x1, y1, x2, y2, strokeWidth, color, capStyle, endCapShapes})

  :param x1/y1: One end of the line
  :param x2/y2: Other end of the line
  :param strokeWidth: Width of the line
  :param color: Color of the line
  :param capStyle: Line cap style. Defaults to ``'round'``. Read the HTML
                   ``<canvas>`` docs for other valid values.
  :param endCapShapes: Two-item list ``[srcShapeId, destShapeId]``, where each
                       value is ``'arrow'`` or ``null``.
  :param dash: Value to be passed to ``ctx.setLineDash()`` when this line is
               rendered.

.. _shape-Text:

.. js:function:: LC.createShape('Text', {x, y, text, color, font})

  :param x/y: Top left corner position
  :param text: String to render
  :param color: Text color
  :param font: Font settings string. The format is apprimately
               ``"[italic] [bold] fontSize fontName"``.
  :param forcedWidth: If ``null``, this shape's width is equal to the rendered
                      width of the text. Otherwise, the text is wrapped to
                      this width.
  :param forcedHeight: Height the user has specified for this text box. Ignored
                       when rendering; only used to show the dragging box while
                       resizing.
  :param v: Version of the text shape API this shape was created with.
            Defaults to 1. Shapes from version 0 will be converted to version
            1.

.. _shape-LinePath:

.. js:function:: LC.createShape('LinePath', {points, smooth})

  :param points: List of :ref:`Point <shape-Point>` objects
  :param smooth: If ``true``, the given points will be smoothed to look more
                 natural. Defaults to ``true``.

.. _shape-ErasedLinePath:

.. js:function:: LC.createShape('ErasedLinePath', {points, interpolate})

  :param points: List of :ref:`Point <shape-Point>` objects
  :param smooth: If ``true``, the given points will be smoothed to look more
                 natural. Defaults to ``true``.

.. _shape-Polygon:

.. js:function:: LC.createShape('Polygon', {points, fillColor, strokeColor, strokeWidth, isClosed})

  :param points: List of :ref:`Point <shape-Point>` objects
  :param fillColor: Fill color
  :param strokeColor: Stroke color
  :param strokeWidth: Width of the line around the edge.
  :param isClosed: If ``true``, draws a line between the first and last points.


.. _shape-Ellipse:

.. js:function:: LC.createShape('Ellipse', {x, y, width, height, strokeWidth, strokeColor, fillColor})

  :param points: List of :ref:`Point <shape-Point>` objects
  :param fillColor: Fill color
  :param strokeColor: Stroke color
  :param strokeWidth: Width of the line around the edge.

.. _shape-Point:

.. js:function:: LC.createShape('Point', {x, y, size, color})

  :param x/y: Upper left corner position
  :param size: Size of the rectangle
  :param color: Color of the point

  :ref:`Point <shape-Point>` is primarily an internal data structure for
  :ref:`LinePath <shape-LinePath>` and
  :ref:`ErasedLinePath <shape-ErasedLinePath>`. It can't currently be
  drawn.

.. _shape-SelectionBox:

.. js:function:: LC.createShape('SelectionBox', {shape, backgroundColor})

  .. note:: This shape is mostly for internal use.

  :param shape: Shape to draw the box around
  :param backgroundColor: Color to render behind the selection box

Shapes and JSON
---------------

Each shape has a JSON representation so that you can save and load drawings.
But just calling :js:func:`shape.toJSON` won't give you a value that you can
decode later; Literally Canvas wraps these values in containers with additional
information. Instead, you can use these functions to save and load shapes:

.. js:function:: LC.shapeToJSON(shape)

  :returns: JSON-encoded string representing *shape*

.. js:function:: LC.JSONToShape(jsonEncodedString)

  :returns: Shape instance constructed from *jsonEncodedString*

If you've saved a snapshot with :js:func:`LC.getSnapshot()` or
:js:func:`LC.getSnapshotJSON()`, you can convert that to a list of deserialized
shape objects with these functions:

.. js:function:: LC.snapshotToShapes(snapshot)
.. js:function:: LC.snapshotJSONToShapes(snapshotJSON)

Rendering shapes outside of an interactive session
--------------------------------------------------

.. js:function:: LC.renderShapesToCanvas(shapes, bounds, scale=1, canvas=null)

  Draws the given shapes to the given canvas. Creates a new canvas if none is
  provided. Returns the canvas containing the rendered shapes.

  :param shapes: List of shapes

  :param bounds:
      A dict ``{x, y, width, height}`` specifying which part of the image to
      draw, in drawing coordinates (before scaling).

  :param scale:
      Amount by which to scale the image output. Shapes will be rendered at
      full resolution. Defaults to ``1``.

  :param canvas:
      Canvas object on which to render the shapes. If ``null``, a new canvas
      will be created with the size specified by *bounds*.

  This function can be used to render a snapshot to an image without
  instantiating a :js:class:`LiterallyCanvas` object like this:

  .. code-block:: javascript

    var snapshotJSON = localStorage['saved-snapshot'];
    var canvas = LC.renderShapesToCanvas(
      LC.snapshotJSONToShapes(snapshotJSON),
      {x: 0, y: 0, width: 100, height: 100});
    // Now you can pull out the image using a data URL:
    var dataURL = canvas.toDataURL();
    // Or pull out the bytes using the canvas API.

.. js:function:: LC.renderShapesToSVG(shapes, bounds, backgroundColor)

  Converts the list of shapes to an SVG string.

  :param shapes: List of shapes

  :param bounds:
      A dict ``{x, y, width, height}`` specifying which part of the image to
      draw, in drawing coordinates.

  :param backgroundColor:
      SVG color to draw behind the shapes.

  This function can be used to render a snapshot to SVG without
  instantiating a :js:class:`LiterallyCanvas` object like this:

  .. code-block:: javascript

    var snapshotJSON = localStorage['saved-snapshot'];
    var svgString = LC.renderShapesToSVG(
      LC.snapshotJSONToShapes(snapshotJSON),
      {x: 0, y: 0, width: 100, height: 100},
      'transparent');


Defining shapes
---------------

If you want to make your own tool, or do some custom canvas rendering as the
background of your drawing, you'll need to define a shape. Then you can create
it using the :js:func:`LC.createShape` function.

.. js:function:: LC.defineShape(name, methods)

.. js:function:: LC.defineCanvasRenderer(name, drawShape)

  :param name: Name of the shape

  :param drawShape:
      A function that takes ``(canvasContext, shape)`` and
      renders the shape to the context.

.. js:function:: LC.defineSVGRenderer(name, shapeToSVGString)

  :param name: Name of the shape

  :param shapeToSVGString:
      A function that returns an SVG string representing the given shape.

.. code-block:: javascript

  LC.defineShape('MyAwesomeShape', {
    /* initialize using the args passed to LC.createShape() */
    constructor: function(args) {
      this.x = args.x;
      this.y = args.y;
      this.doStuff();
    },

    /* you can add arbitrary methods */
    doStuff: function() {},

    /* provide a bounding rectangle so getImage() can figure out the image
       bounds (semi-optional) */
    getBoundingRect: function() {
      return {x: this.x, y: this.y, width: 0, height: 0};
    },

    /* return a dictionary representation of the shape from which this instance
       can be reconstructed */
    toJSON: function() {
      return {x: this.x, y: this.y};
    },

    /* reconstruct the MyAwesomeShape from the representation given by
       toJSON */
    fromJSON: function(data) {
      return LC.createShape('MyAwesomeShape', data);
    }
  });

  /* Define canvas and SVG renderers */

  LC.defineCanvasRenderer('MyAwesomeShape', function(ctx, shape) {
    ctx.renderStuff();
  })

  // You can skip this step if you never export to SVG
  LC.defineSVGRenderer('MyAwesomeShape', function(shape) {
    return "<BestShapeEver />";
  })

  /* you can use it as a background */
  var lc = LC.init(element, {
    backgroundShapes: [LC.createShape('MyAwesomeShape', {x: 0, y: 0})]
  });

  /* you can add it as part of the drawing */
  lc.saveShape(LC.createShape('MyAwesomeShape', {x: 100, y: 100}))

Adding shapes to drawings programmatically
------------------------------------------

You can add a shape to the drawing with the
:js:func:`LiterallyCanvas.saveShape() <saveShape>` method, like this:

.. code-block:: javascript

  // let's put a kitten in our drawing
  var lc = LC.init(element, options);
  var img = new Image();
  img.src = 'http://placekitten.com/200/300';
  lc.saveShape(LC.createShape('Image', {x: 100, y: 100, image: img}))
