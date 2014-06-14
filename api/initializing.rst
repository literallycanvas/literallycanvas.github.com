Initializing & Options
======================

Normal
------

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
             LC.RectangleWidget, LC.TextWidget, LC.PanWidget,
             LC.EyeDropperWidget]

        If you need to disable a tool (such as pan), you can remove it from the
        above list and pass the remainder as ``toolClasses``.

        .. code-block:: javascript

            $('.literally').literallycanvas({
                // disable panning
                keyboardShortcuts: false,
                toolClass: [LC.PencilWidget, LC.EraserWidget, LC.LineWidget,
                            LC.RectangleWidget, LC.EyeDropperWidget]
            });

    :param watermarkImage:
        An image to display behind the drawing. The image will be centered and
        not scaled. It will not pan with the drawing.

        .. code-block:: javascript

            var img = new Image()
            img.src = '/static/img/watermark.png'
            $('.literally').literallycanvas({watermarkImage: img});


With jQuery
-----------

.. code-block:: javascript

  $('.literally').literallycanvas(options);

The jQuery form takes the same options as :js:func:`LC.init`, but it
returns the list of matched elements instead of a
:js:class:`LiterallyCanvas` object. That means if you want to attach event
handlers or otherwise use the functionality of
:js:class:`LiterallyCanvas`, you need to use the *onInit* callback.

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
