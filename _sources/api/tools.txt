Creating Tools
==============

Literally Canvas tools are defined using an oversimplified api [#f1]_. Each
tool defines an icon, an "options style," and three *lifecycle methods* to
start, continue, and end an operation.

If this section is not clear enough, please file and issue on GitHub and we
will try to improve it.

.. note::

  If your method of adding tools is to fork the project, **please don't**.
  If you need custom tools for your particular application, you can do that
  without changing Literally Canvas's source code. That is the entire purpose
  of this API.

  If you want to *contribute* a tool to the project, then by all means, clone
  the repository and send us a pull request.

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

    # strokeWidth is a magic property; see 'Options styles' section below
    constructor: -> @strokeWidth = 5
    optionsStyle: 'stroke-width'

    # lifecycle: mouse is down
    begin: (x, y, lc) ->
      # make the shape we will be working with, in this case a line
      @currentShape = LC.createShape('Line', {
        x1: x, y1: y, x2: x, y2: y, @strokeWidth,
        color: lc.getColor('primary')})

    # lifecycle: mouse is dragging
    continue: (x, y, lc) ->
      # update the shape based on latest state (just set the other end)
      @currentShape.x2 = x
      @currentShape.y2 = y
      # render the shape to the canvas without adding it to the drawing
      lc.update(@currentShape)

    # lifecycle: mouse was released
    end: (x, y, lc) ->
      # save the shape as part of the drawing
      lc.saveShape(@currentShape)

    # lifecycle: tool was just activated
    didBecomeActive: (lc) ->
      # subscribe to events here

    # lifecycle: tool is being deactivated
    willBecomeInactive: (lc) ->
      # unsubscribe from events here


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

Tools can call any method on the given :js:class:`LiterallyCanvas`. Usually
you'll be drawing and adding shapes, but you can also set colors, pan, zoom,
trigger events, and more.

Options styles
--------------

.. note::

  This is the roughest edge of the extensibility API. You may need to make
  minor changes to your custom tools in the future when we improve it.

When you activate a tool, the bottom toolbar changes to show the tool's current
state. The two built-in options styles are ``'stroke-width'`` and ``font``.

The ``stroke-width`` style will "magically" set ``tool.strokeWidth`` on the
active tool when the user clicks an option.

The ``font`` style will set ``tool.text`` to the user-entered text, and
``tool.font`` to a canvas-compatible font string like ``italic 18px Garamond``.

To define your own options style, use this function:

.. js:function:: LC.defineOptionsStyle(identifier, ReactComponent)

  :param identifier:
    String used as the value of `tool.optionsStyle` to attach this options
    style to that tool.
  :param ReactComponent:
    A React component taking the props ``lc`` and ``tool``. ``lc`` is the
    :js:class:`LiterallyCanvas` instance, and ``tool`` is the tool instance.
    This component will be inserted into the bottom toolbar.

For examples, read the source files ``src/optionsStyles/stroke-width.coffee``
and ``src/optionsStyles/font.coffee``. If you need additional assistance, and
*already understand React.js*, please ask the mailing list for help. Our
response time is great.

You should open GitHub issues if you would like specific UI or code
improvements to the existing options styles, or if you think a new kind of
generalized option style would helpful.