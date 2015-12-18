Initializing & Options
======================

Initializing normally
---------------------

.. code-block:: javascript

  var lc = LC.init(element, {option: value})

.. js:function:: LC.init(element, options={})

    **Options**

    .. _opt-imageURLPrefix:

    ``imageURLPrefix``
        Location of Literally Canvas's ``img`` folder, without a trailing
        slash. Defaults to ``lib/img``.

        .. note::

          You probably need to set this, either by passing it as an option, or
          by calling :js:func:`LC.setDefaultImageURLPrefix`.

    .. _opt-imageSize:

    ``imageSize``
      An object with keys ``width`` and ``height``. If either value is falsey,
      that dimension will be infinite. For example:

      .. code-block:: javascript

        // 500 pixels wide, infinitely tall canvas
        LC.init(element, {imageSize: {width: 500, height: null}})

    ``primaryColor``
        Starting stroke color. Defaults to ``'#000'``.

    ``secondaryColor``
        Starting fill color. Defaults to ``'#fff'``.

    ``backgroundColor``
        Starting background color. Defaults to ``'transparent'``.

    ``backgroundShapes``
        List of shapes to display under all other shapes. They will not be
        affected by the Clear button, :js:func:`loadSnapshot`,
        or the eraser tool.

    ``snapshot``
        Snapshot to load immediately. If the snapshot contains values for
        image size, colors, or background shapes, the values in the snapshot
        will override the values passed as options.

        Snapshots are created with :js:func:`getSnapshot` and loaded after
        initialization with :js:func:`loadSnapshot`.

    ``keyboardShortcuts``
        Enable panning with the arrow keys. Defaults to ``true``.

        .. deprecated:: 0.4.9

        You can replicate this option with a tiny bit of code:

        .. code-block:: javascript

          document.addEventListener('keydown', function(e) {
            if (e.keyCode == 37) lc.pan(-10, 0);
            if (e.keyCode == 38) lc.pan(0, -10);
            if (e.keyCode == 39) lc.pan(10, 0);
            if (e.keyCode == 40) lc.pan(0, 10);
            if (e.keyCode >= 37 && e.keyCode <= 40) {
              e.preventDefault(); // prevents keyboard page scrolling!
              lc.repaintAllLayers();
            }
          });

    ``toolbarPosition``

        * ``'bottom'`` (default)
        * ``'top'``
        * ``'hidden'``

    ``tools``
        A list of tools to enable. The default value, accessible at
        :js:attr:`LC.defaultTools`, is:

        .. code-block:: javascript

            [
              LC.tools.Pencil,
              LC.tools.Eraser,
              LC.tools.Line,
              LC.tools.Rectangle,
              LC.tools.Text,
              LC.tools.Polygon,
              LC.tools.Pan,
              LC.tools.Eyedropper
            ]

        If you write your own tool, you can append it to the list above and
        pass the whole list as the value of ``tools``.

        If you need to disable a tool (such as pan), you can remove it from the
        list above and pass the remainder as the value of ``tools``.

        .. code-block:: javascript

            LC.init(element, {
                // disable panning
                keyboardShortcuts: false,
                tools: [LC.tools.Pencil, LC.tools.Eraser, LC.tools.Line,
                  LC.tools.Rectangle, LC.tools.Text, LC.tools.Eyedropper]
            });

    ``strokeWidths``
        A list of possible stroke widths. Defaults to
        ``[1, 2, 5, 10, 20, 30]``.

    ``defaultStrokeWidth``
        Default stroke width for all shapes. Defaults to ``5``.

    ``watermarkImage``
        An image to display behind the drawing. The image will be centered.
        It will not pan with the drawing.

        .. code-block:: javascript

            var img = new Image()
            img.src = '/static/img/watermark.png'
            $('.literally').literallycanvas({watermarkImage: img});

    ``watermarkScale``
        Scale at which to render the watermark.

        If you want to support retina displays, you should use a double-size
        watermark image and set *watermarkScale* to
        ``1/window.devicePixelRatio``.

    ``zoomMax``
        Maximum zoom value. Defaults to 4.0.

    ``zoomMin``
        Minimum zoom value. Defaults to 0.2.

    ``zoomStep``
        Amount by which the zoom in/out buttons change the zoom level. Defaults
        to 0.2.


Initializing with jQuery
------------------------

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

        $(element).literallycanvas({
          onInit: function(lc) {
            lc.on('drawingChange', function() {
              console.log("The drawing was changed.");
            })
          }
        });

    :type onInit: function(:js:class:`LiterallyCanvas`)

Translating the examples to jQuery form
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Examples will often use the return value of :js:func:`LC.init`, a
:js:class:`LiterallyCanvas` object.

.. code-block:: javascript

  var lc = LC.init(element, options);
  lc.on('drawingChange', function() {
    console.log("The drawing was changed.");
  });

If you initialize Literally Canvas with the jQuery plugin, you won't get the
``lc`` value back. Instead, you need to use the *onInit* callback,
which gets that same value as its argument:

.. code-block:: javascript

  $(element).literallycanvas({
    onInit: function(lc) {
      lc.on('drawingChange', function() {
        console.log("The drawing was changed.");
      })
    }
  });

Alternatively, you can just use jQuery to get the first argument to
:js:func:`LC.init`, like this:

.. code-block:: javascript

  var lc = LC.init($('selector').get(0), options);
  lc.on('drawingChange', function() {
    console.log("The drawing was changed.");
  });

Breaking changes since v0.3
---------------------------

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
