Installing
==========

.. note::

    Please `open a GitHub ticket`_ if we can improve this process.

.. _open a GitHub ticket: http://github.com/literallycanvas/literallycanvas/issues/new

Get the assets
--------------

You can just |link-pre|\ |version|\ |link-post|. Or use Bower:

.. code-block:: sh

    bower install literallycanvas

.. note::
    Don't try to use ``bower`` with the ``literallycanvas/master`` branch. It
    won't work. The repo used by the registry is up to date.

.. note::
    NPM support is coming in version 0.4.12.

.. |link-pre| raw:: html

    <a href="https://github.com/literallycanvas/literallycanvas/archive/v

.. |link-post| raw:: html

    .tar.gz">download the tarball</a>

Include the assets and write the code
-------------------------------------

The Literally Canvas distribution includes several files. You can put them wherever you want.

* ``img/``: Images for the GUI. You'll pass the absolute URL to this directory
  as the ``imageURLPrefix`` option.
* ``css/literallycanvas.css``: Required stylesheet.
* ``js/literallycanvas[.min].js``: The magic.

Here's a basic working setup. Each part is required.

.. code-block:: html

    <html>
      <head>
        <!-- stylesheet -->
        <link href="/static/css/literallycanvas.css" rel="stylesheet">

        <!-- dependency: React.js -->
        <script src="//cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react-with-addons.js"></script>

        <!-- Literally Canvas -->
        <script src="/static/js/literallycanvas.js"></script>
      </head>
      <body>
        <!-- where the widget goes. you can do CSS to it. -->
        <div class="literally"></div>

        <!-- kick it off -->
        <script>
            // Look ma, no jQuery!
            LC.init(
                document.getElementsByClassName('literally')[0],
                {imageURLPrefix: '/static/img'}
            );

            /* or if you just love jQuery,
                $('.literally').literallycanvas({imageURLPrefix: '/static/img'})
                or
                LC.init($('.literally').get(0), {imageURLPrefix: '/static/img'})
            */
        </script>
      </body>
    </html>

Skipping the GUI and the React dependency
-----------------------------------------

To use Literally Canvas with no GUI and no React dependency, you can use the
:dfn:`core build`. It lives at ``/js/literallycanvas-core[.min].js``. The
core build works just like the normal build, but it doesn't include any of the
GUI code. Check out the :doc:`examples/core` example for details.
