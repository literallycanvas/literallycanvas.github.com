User guide
==========

Installation
------------

.. note::

    Please `open a GitHub ticket`_ if we can improve this process.

.. _open a GitHub ticket: http://github.com/literallycanvas/literallycanvas/issues/new

Step 1: Get the assets
^^^^^^^^^^^^^^^^^^^^^^

`Download the tarball`_, or use Bower:

.. _Download the tarball: ghp-import -p -r lc-bower -m "release" -b master literallycanvas

.. code-block:: sh

    bower install https://github.com/literallycanvas/literallycanvas/archive/v0.3-rc2.tar.gz

Don't just point ``bower`` at the ``master`` branch. It won't work. Point it
specifically to a tag, the ``release`` branch (if it ever gains that ability),
or the tarball.

.. warning::

    ``bower install literallycanvas`` is currently broken. The Bower
    maintainers need to update our repo URL in the registry; there is no
    automated way to do this.

Step 2: Include the assets
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: html

    <link href="/static/lib/css/literally.css" rel="stylesheet">

    <!-- jQuery should already be available -->
    <script src="/static/lib/js/literallycanvas.jquery.js"></script>

Step 3: Write markup and CSS
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Here is the suggested markup:

.. code-block:: html

    <div class="literally"><canvas></canvas></div>

Literally Canvas will create the ``<canvas>`` if it doesn't exist, but you can
see why we prefer the above markup.

You need to give the container ``<div>`` a size by styling it with CSS.
Otherwise your canvas will have a height of zero.

.. code-block:: css

    .literally {
        width: 100%;   /* fill container width */
        height: 500px;
    }

.. note::

    You should **not** set the size by styling ``<canvas>``.

Creating a canvas
-----------------

.. js:function:: $('.literally').literallycanvas(options);

    :param imageURLPrefix: Location of Literally Canvas's ``img/`` folder.

                           .. note:: You probably need to set this.

    :param onInit: This callback is a convenient place to set up event
                   handlers, programmatically add shapes, or otherwise
                   integrate with your application.

                   :ref:`saving-and-loading` has an example of how you might
                   use this option.
    :type onInit: function(:js:class:`LiterallyCanvas`)

    :param primaryColor: Starting stroke color. Defaults to ``'#000'``.
    :param secondaryColor: Starting fill color. Defaults to ``'#fff'``.
    :param backgroundColor: Starting background color. Defaults to
                            ``'transparent'``.
    :param keyboardShortcuts: Enable panning with the arrow keys. Defaults to
                              ``true``.

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
             LC.RectangleWidget, LC.PanWidget, LC.EyeDropperWidget]

        If you need to disable a tool (such as pan), you can remove it from the
        above list and pass the remainder as ``toolClasses``.

        .. code-block:: javascript

            $('.literally').literallycanvas({
                // disable panning
                keyboardShortcuts: false,
                toolClass: [LC.PencilWidget, LC.EraserWidget, LC.LineWidget,
                            LC.RectangleWidget, LC.EyeDropperWidget]
            });

        .. note::

            This simplistic API will likely change in favor of one that doesn't
            expose so much internal information.

    :param watermarkImage:
        An image to display behind the drawing. The image will be centered and
        not scaled. It will not pan with the drawing.

        .. code-block:: javascript

            var img = new Image()
            img.src = '/static/img/watermark.png'
            $('.literally').literallycanvas({watermarkImage: img});

.. _saving-and-loading:

Saving and loading drawings
---------------------------

Literally Canvas can serialize the user's drawing as a Javascript object.
Generally, you probably want to do this in response to events.

Here's a complete example that saves the drawing to ``localStorage`` so that
when the user refreshes the page, the drawing persists.

.. code-block:: javascript

    $('.literally').literallycanvas({
        onInit: function(lc) {
            if (localStorage.getItem('drawing')) {
              lc.loadSnapshotJSON(localStorage.getItem('drawing'));
            }
            lc.on('drawingChange', function() {
                localStorage.setItem('drawing', lc.getSnapshotJSON());
            });
        }
    });

.. _exporting-images:

Exporting images
----------------

Internally, Literally Canvas uses more than one canvas to draw efficiently. You
can use :js:func:`LiterallyCanvas.canvasForExport` to get a fully rendered
canvas object, which you can use as needed to export your image.

For example, if you wanted to open the rendered image in a new window, you'd do
something like this:

.. code-block:: javascript

    $('.literally').literallycanvas({
        onInit: function(lc) {
            $('.save-button').click(function() {
                window.open(lc.canvasForExport().toDataURL());
            });
        }
    });

.. note::

    Many image uploading services support base64-encoded data. You can get that
    data this way:

    .. code-block:: javascript

        window.open(lc.canvasForExport().toDataURL().split(',')[1]);

Adding images
-------------

You can add images to a drawing programmatically. Literally Canvas does not yet
provide a UI for adding images.

.. code-block:: javascript

    $('.literally').literallycanvas({
        onInit: function(lc) {
            var backgroundImage = new Image()
            backgroundImage.src = '/static/images/background.png';
            // we'll need to redraw once it loads
            backgroundImage.onload = function () {lc.repaint(true);}
            lc.saveShape(new LC.ImageShape(0, 0, backgroundImage));
        }
    });

If you also use saving and loading, you'll want to make sure your drawing is
empty before adding a background to it. Otherwise, you'll end up with a new
duplicate of your background image each time you load it.

.. code-block:: javascript

    $('.literally').literallycanvas({
        onInit: function(lc) {
            if (lc.numShapes() == 0) {  // only if drawing is empty
                var backgroundImage = new Image()
                backgroundImage.src = '/static/images/background.png';
                // we'll need to redraw once it loads
                backgroundImage.onload = function () {lc.repaint(true);}
                lc.saveShape(new LC.ImageShape(0, 0, backgroundImage));
            }
            // subsequent loads will already have the background
            lc.loadSnapshotJSON(localStorage.getItem('drawing'));
        }
    });
