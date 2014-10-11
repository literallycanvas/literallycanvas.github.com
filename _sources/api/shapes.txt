Shapes
======

A drawing is composed of *shapes*. Shapes are added either by tools or by you,
programmatically. All shapes are created through the
:js:func:`LC.createShape` function.

A "color" is a CSS color string.

Creating shapes
---------------

.. _shape-Image:

.. js:function:: LC.createShape('Image', {x, y, image, scale})

  :param x/y: Upper left corner position
  :param image: A DOM `Image` object
  :param scale: Scale at which to render the image

.. _shape-Rectangle:

.. js:function:: LC.createShape('Rectangle', {x, y, width, height, strokeWidth, strokeColor, fillColor})

  :param x/y: Upper left corner position
  :param width/height: Size of the rectangle
  :param strokeWidth: Width of the border
  :param strokeColor: Color of the border
  :param fillColor: Color of the middle

.. _shape-Line:

.. js:function:: LC.createShape('Line', {x1, y1, x2, y2, strokeWidth, color})

  :param x1/y1: One end of the line
  :param x2/y2: Other end of the line
  :param strokeWidth: Width of the line
  :param color: Color of the line

.. _shape-Text:

.. js:function:: LC.createShape('Text', {x, y, text, color, font})

  :param x/y: *Bottom* left corner position
  :param text: String to render
  :param color: Text color
  :param font: Font settings string. The format is apprimately
               ``[italic] [bold] fontSize fontName``.

.. _shape-LinePath:

.. js:function:: LC.createShape('LinePath', {points, interpolate})

  :param points: List of :ref:`Point <shape-Point>` objects
  :param smooth: If ``true``, the given points will be smoothed to look more
                 natural. Defaults to ``true``.

.. _shape-ErasedLinePath:

.. js:function:: LC.createShape('ErasedLinePath', {points, interpolate})

  :param points: List of :ref:`Point <shape-Point>` objects
  :param smooth: If ``true``, the given points will be smoothed to look more
                 natural. Defaults to ``true``.

.. _shape-Point:

.. js:function:: LC.createShape('Point', {x, y, size, color})

  :param x/y: Upper left corner position
  :param size: Size of the rectangle
  :param color: Color of the point

  :ref:`Point <shape-Point>` is primarily an internal data structure for
  :ref:`LinePath <shape-LinePath>` and
  :ref:`ErasedLinePath <shape-ErasedLinePath>`. It can't currently be
  drawn.

Defining shapes
---------------

If you want to make your own tool, or do some custom canvas rendering as the
background of your drawing, you'll need to define a shape. Then you can create
it using the :js:func:`LC.createShape` function.

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

    /* use ctx to draw stuff */
    draw: function(ctx) {
    },

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

  /* use it as a background */
  var lc = LC.init(element, {
    backgroundShapes: [LC.createShape('MyAwesomeShape', {x: 0, y: 0})]
  });

  /* add it as part of the drawing */
  lc.saveShape(LC.createShape('MyAwesomeShape', {x: 100, y: 100}))

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
