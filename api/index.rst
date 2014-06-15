API
===

.. toctree::
    :maxdepth: 2

    initializing.rst
    LiterallyCanvas.rst
    events.rst
    shapes.rst
    tools.rst
    util.rst

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
