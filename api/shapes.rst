Shapes
======

A drawing is composed of *shapes*. Shapes are added either by tools or by you,
programmatically. All shapes are created through the
:js:func:`LC.createShape` function.

A "color" is a CSS color string.

Creating shapes
---------------

.. _shape-Image:

.. js:function:: LC.createShape('Image', {x, y, image})

  :param x/y: Upper left corner position
  :param image: A DOM `Image` object

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

.. js:function:: LC.createShape('LinePath', {points})

  :param points: List of :ref:`Point <shape-Point>` objects

.. _shape-ErasedLinePath:

.. js:function:: LC.createShape('ErasedLinePath', {points})

  :param points: List of :ref:`Point <shape-Point>` objects

.. _shape-Point:

.. js:function:: LC.createShape('Point', {x, y, size, color})

  :param x/y: Upper left corner position
  :param size: Size of the rectangle
  :param color: Color of the point

  ``Point`` is primarily an internal data structure for
  :ref:`LinePath <_shape-LinePath>` and
  :ref:`ErasedLinePath <_shape-ErasedLinePath>`. It can't currently be
  drawn.
