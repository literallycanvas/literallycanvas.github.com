Creating Tools
==============

Literally Canvas tools are defined using an oversimplified api [#f1]_. Each
tool defines an icon, an "options style," and three *lifecycle methods* to
start, continue, and end an operation.

If this section is not clear enough, please file and issue on GitHub and we
will try to improve it.

.. rubric:: Footnotes

.. [#f1] A more powerful tool API is a high-priority goal for the next major
         release.

Defining a tool
---------------

Literally Canvas is developed in CoffeeScript, and all of our internal examples
use CoffeeScript, so this example will be in CoffeeScript. We will add
documentation in JavaScript if there is sufficient demand. (As usual, please
express demand via GitHub issues.)

Plain JavaScript should work just fine as long as we can call ``new Tool()``
and get back something that works.

.. code-block:: coffeescript

  # reimplementation of the built-in line tool
  class MyLine
    name: 'MyLine'
    iconName: 'line'  # imageURLPrefix/line.png is the full URL

    constructor: -> @strokeWidth = 5
    optionsStyle: 'stroke-width'

    begin: (x, y, lc) ->
      # make the shape we will be working with, in this case a line
      @currentShape = LC.createShape('Line', {
        x1: x, y1: y, x2: x, y2: y, @strokeWidth,
        color: lc.getColor('primary')})

    continue: (x, y, lc) ->
      # update the shape based on latest state (just set the other end)
      @currentShape.x2 = x
      @currentShape.y2 = y
      # render the shape to the canvas without adding it to the drawing
      lc.update(@currentShape)

    end: (x, y, lc) ->
      # save the shape as part of the drawing
      lc.saveShape(@currentShape)

  # now expose our custom tool to the user
  LC.init(element, {tools: [
    LC.tools.Pencil,
    LC.tools.Eraser,
    LC.tools.MyLine,  # here it is!
    LC.tools.Rectangle,
    LC.tools.Text,
    LC.tools.Pan,
    LC.tools.Eyedropper
  ]})