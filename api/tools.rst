Creating Tools
==============

.. note::

  If your method of adding tools is to fork the project or edit the generated
  JS, **please don't**. If you need custom tools for your particular
  application, you can do that without changing Literally Canvas's source code.
  That is the entire purpose of this API.

  If you want to *contribute* a tool to the project, then by all means, clone
  the repository and send us a pull request.

Literally Canvas has two APIs for creating tools: a *simple* API (old style)
and a *normal* API (new style).

For both APIs, a tool is an object with a specific set of keys.

``name``
    Unique identifier for the tool.

``iconName``
    Name of the image to be used in the toolbar for this tool, not including
    the extension. The full URL of the image will be
    ``{imageURLPrefix}/{iconName}.png``.

``optionsStyle``
    Which toolbar to show while this tool is active. There is a crappy API
    available to add new possibilities. The built-in values are:

    ``null`` or ``'null'``
      Show nothing.

    ``'stroke-width'``
      Show a stroke width picker and set the tool's ``strokeWidth`` property.

    ``'font'``
      Set the tool's ``font`` property to a canvas-compatible font string.

.. code-block:: javascript

  var MyTool = function() {
    var self = this;

    return {
      name: 'MyTool',
      iconName: 'line',

      optionsStyle: 'stroke-width',
      strokeWidth: 2,
      // ...more to follow
    }
  };

  LC.init(el, {
    // Add me to the toolbar
    tools: LC.defaultTools.concat([MyTool])
  });

Simple API
----------

To implement a tool using the "simple" API, you just need to implement three
*lifecycle methods*: ``begin``, ``continue``, and ``end``. 

Here's an alternate version of the line tool.

.. note::

  This code block hasn't been tested, so you might have to file a bug report
  and get it fixed.

.. code-block:: javascript

  var MyTool = function() {
    var self = this;

    return {
      name: 'MyTool',
      iconName: 'line',
      strokeWidth: 2,
      optionsStyle: 'stroke-width',

      begin: function(x, y, lc) {
        self.currentShape = LC.createShape('Line', {
          x1: x, y1: y, x2: x, y2: y,
          self.strokeWidth, color: lc.getColor('primary')});
      },

      continue: function(x, y, lc) {
        self.currentShape.x2 = x;
        self.currentShape.y2 = y;
        lc.setShapesInProgress([self.currentShape]);
      },

      end: function(x, y, lc) {
        self.currentShape.x2 = x;
        self.currentShape.y2 = y;
        lc.setShapesInProgress([]);
        lc.saveShape(self.currentShape);
      }
    }
  };

  LC.init(el, {
    // Add me to the toolbar
    tools: LC.defaultTools.concat([MyTool])
  });

Normal API
----------

If you want more sophisticated behavior than just touch-drag-release, you can
attach event handlers and listen to pointer events and do anything you like.

Here's the same tool implemented using the normal API.

.. note::

  This code block hasn't been tested, so you might have to file a bug report
  and get it fixed.

.. code-block:: javascript

  var MyTool = function() {
    var self = this;

    return {
      usesSimpleAPI: false,  // DO NOT FORGET THIS!!!
      name: 'MyTool',
      iconName: 'line',
      strokeWidth: 2,
      optionsStyle: 'stroke-width',

      didBecomeActive: function(lc) {
        var onPointerDown = function(pt) {
          self.currentShape = LC.createShape('Line', {
            x1: pt.x, y1: pt.y, x2: pt.x, y2: pt.y,
            self.strokeWidth, color: lc.getColor('primary')});
          lc.setShapesInProgress([self.currentShape]);
          lc.repaintLayer('main');
        };

        var onPointerDrag = function(pt) {
          self.currentShape.x2 = pt.x;
          self.currentShape.y2 = pt.y;
          lc.setShapesInProgress([self.currentShape]);
          lc.repaintLayer('main');
        };

        var onPointerUp = function(pt) {
          self.currentShape.x2 = pt.x;
          self.currentShape.y2 = pt.y;
          lc.setShapesInProgress([]);
          lc.saveShape(self.currentShape);
        };

        var onPointerMove = function(pt) {
          console.log("Mouse moved to", pt);
        };

        // lc.on() returns a function that unsubscribes us. capture it.
        self.unsubscribeFuncs = [
          lc.on('lc-pointerdown', onPointerDown),
          lc.on('lc-pointerdrag', onPointerDrag),
          lc.on('lc-pointerup', onPointerUp),
          lc.on('lc-pointermove', onPointerMove)
        ];
      },

      willBecomeInactive: function(lc) {
        // call all the unsubscribe functions
        self.unsubscribeFuncs.map(function(f) { f() });
      }
    }
  };

  LC.init(el, {
    // Add me to the toolbar
    tools: LC.defaultTools.concat([MyTool])
  });

Tools can call any method on the given :js:class:`LiterallyCanvas` object.
Usually you'll be drawing and adding shapes, but you can also set colors, pan,
zoom, trigger events, and more.

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