Initializing & Options
======================

Changes since v0.3
------------------

* *backgroundShapes* and *watermarkImage* are no longer affected by the eraser.
* The *preserveCanvasContents* option is gone. If you want to use the contents
  of an existing canvas element as the background of a drawing, do this:

    .. code-block:: javascript

        backgroundImage = new Image();
        backgroundImage.src = $('canvas.my-canvas').get(0).toDataURL();
        backgroundShape = LC.createShape(
          'Image', {x: 0, y: 0, image: backgroundImage}));
        $('.literally').literallycanvas({backgroundShapes: [backgroundShape]});

* Tools are defined by the new *tools* option, which replaces the old
  *toolClasses* and takes a different list of arguments.

Initializing normally
---------------------

.. code-block:: javascript

  var lc = LC.init(element, options)

.. js:function:: LC.init(element, options)

    :param imageURLPrefix:
      Location of Literally Canvas's ``img/`` folder.

      .. note::

        You probably need to set this, either by passing it as an option, or
        by calling :js:func:`LC.setDefaultImageURLPrefix`.

    :param primaryColor:
      Starting stroke color. Defaults to ``'#000'``.

    :param secondaryColor:
      Starting fill color. Defaults to ``'#fff'``.

    :param backgroundColor:
      Starting background color. Defaults to ``'transparent'``.

    :param backgroundShapes:
      List of shapes to display under all other shapes. They will not be
      affected by the Clear button, :js:func:`loadSnapshot`,
      or the eraser tool.

    :param keyboardShortcuts:
      Enable panning with the arrow keys. Defaults to ``true``.

    :param tools:
        A list of tools to enable. The default value is:

        .. code-block:: javascript

            [
              LC.tools.Pencil,
              LC.tools.Eraser,
              LC.tools.Line,
              LC.tools.Rectangle,
              LC.tools.Text,
              LC.tools.Pan,
              LC.tools.Eyedropper
            ]

        If you need to disable a tool (such as pan), you can remove it from the
        above list and pass the remainder as ``toolClasses``.

        .. code-block:: javascript

            LC.init(element, {
                // disable panning
                keyboardShortcuts: false,
                tools: [LC.tools.Pencil, LC.tools.Eraser, LC.tools.Line,
                  LC.tools.Rectangle, LC.tools.Text, LC.tools.Eyedropper]
            });

    :param watermarkImage:
        An image to display behind the drawing. The image will be centered.
        It will not pan with the drawing.

        .. code-block:: javascript

            var img = new Image()
            img.src = '/static/img/watermark.png'
            $('.literally').literallycanvas({watermarkImage: img});

    :param watermarkScale:
        Scale at which to render the watermark.

        If you want to support retina displays, you should use a double-size
        watermark image and set *watermarkScale* to 0.5.


Initializing with jQuery
------------------------

.. code-block:: javascript

  $('.literally').literallycanvas(options);

The jQuery form takes the same options as :js:func:`LC.init`, but it
returns the list of matched elements instead of a
:js:class:`LiterallyCanvas` object. That means if you want to attach event
handlers or otherwise use the functionality of
:js:class:`LiterallyCanvas`, you need to use the *onInit* callback.

**How to translate the examples**

TODO

.. js:function:: $.literallycanvas(options)

    :returns: jQuery element list

    :param onInit:
      A function to be called as soon as Literally Canvas is initialized.
      This is where you set up event handlers, programmatically add shapes, or
      otherwise integrate with your application.

      Here's a quick example:

      .. code-block:: javascript

        LC.init(element, {
          onInit: function(lc) {
            lc.on('drawingChange', function() {
              console.log("The drawing was changed.");
            })
          }
        })

    :type onInit: function(:js:class:`LiterallyCanvas`)
