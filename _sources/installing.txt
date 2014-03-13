Installing
==========

.. note::

    Please `open a GitHub ticket`_ if we can improve this process.

.. _open a GitHub ticket: http://github.com/literallycanvas/literallycanvas/issues/new

Get the assets
--------------

You can just `download the tarball`_. Or use Bower:

.. code-block:: sh

    bower install literallycanvas

Don't try to use ``bower`` with the ``literallycanvas/master`` branch. It won't
work. The repo used by the registry is up to date.

.. _download the tarball: https://github.com/literallycanvas/literallycanvas/archive/master.tar.gz

Include the assets
------------------

The Literally Canvas distribution includes several files.

``lib/css/literally.css`` includes styles necessary to render the canvas and
toolbar.

``lib/img`` contains the toolbar images.

``lib/js/literally.jquery[.min].js`` is the Javascript file you need to use
the jQuery plugin. The other Javascript files only contain the code for the
internals.

Ultimately, you just need to do this:

.. code-block:: html

    <link href="/static/lib/css/literally.css" rel="stylesheet">

    <!-- jQuery should already be available -->
    <script src="/static/lib/js/literallycanvas.jquery.js"></script>

and pass a value for the ``imageUrlPrefix`` parameter to
:js:func:`$.literallycanvas`.

Write code
----------

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

Finally, instantiate Literally Canvas:

.. code-block:: javascript

    $('.literally').literallycanvas({imageUrlPrefix: '/static/lib/img'});
