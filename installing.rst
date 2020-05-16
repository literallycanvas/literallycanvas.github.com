Installing
==========

.. note::

    Please `open a GitHub ticket`_ if we can improve this process.

.. _open a GitHub ticket: http://github.com/literallycanvas/literallycanvas/issues/new

Get the code and the assets
---------------------------

You can get the assets from the NPM package, or from
|link-pre|\ |version|\ |link-post|.

You can get the source from the tarball as well and include it as a standalone
JS file, or you can install it from NPM as ``literallycanvas@0.5.2``.

`Here are several example installations you can use for reference. <https://github.com/literallycanvas/literallycanvas-demos>`_

.. |link-pre| raw:: html

    <a href="https://github.com/literallycanvas/literallycanvas/archive/v

.. |link-post| raw:: html

    .tar.gz">the tarball</a>

Include the assets and write the code
-------------------------------------

The Literally Canvas distribution includes several files. You can put them wherever you want.

* ``img/``: Images for the GUI. You'll pass the absolute URL to this directory
  as the ``imageURLPrefix`` option.

  .. note:: If you install from npm, you can copy the images from
     ``node_modules/literallycanvas/lib/img/`` to your build directory.

* ``css/literallycanvas.css``: Required stylesheet.

  .. note:: If you install from npm, you can find this at
     ``node_modules/literallycanvas/lib/css/literallycanvas.css``.

* ``js/literallycanvas[.min].js``: The magic.

Classic Style
~~~~~~~~~~~~~

Here's a basic working setup. Each part is required.

.. code-block:: html

    <html>
      <head>
        <!-- stylesheet -->
        <link href="/static/css/literallycanvas.css" rel="stylesheet">

        <!-- dependency: React.js -->
        <script src="//cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-with-addons.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom.js"></script>

        <!-- Literally Canvas -->
        <script src="/static/js/literallycanvas.js"></script>
      </head>
      <body>
        <!-- where the widget goes. you can do CSS to it. -->
        <!-- note: as of 0.4.13, you cannot use 'literally' as the class name.
             sorry about that. -->
        <div class="my-drawing"></div>

        <!-- kick it off -->
        <script>
            LC.init(
                document.getElementsByClassName('my-drawing')[0],
                {imageURLPrefix: '/static/img'}
            );
        </script>
      </body>
    </html>

React.js Style
~~~~~~~~~~~~~~

Literally Canvas can be used as a React component!

.. code-block:: html

    <html>
      <head>
        <!-- stylesheet -->
        <link href="/static/css/literallycanvas.css" rel="stylesheet">

        <!-- dependency: React.js -->
        <script src="//cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-with-addons.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>

        <!-- Literally Canvas -->
        <script src="/static/js/literallycanvas.js"></script>
      </head>
      <body>
        <div id="root"></div>

        <script type="text/babel">
            ReactDOM.render(
                <div>
                    <LC.LiterallyCanvasReactComponent imageURLPrefix="/static/img" />
                </div>,
                document.getElementById('root'));
        </script>
      </body>
    </html>

Skipping the GUI and the React dependency
-----------------------------------------

To use Literally Canvas with no GUI and no React dependency, you can use the
:dfn:`core build`. It lives at ``/js/literallycanvas-core[.min].js``. The
core build works just like the normal build, but it doesn't include any of the
GUI code. Check out the :doc:`examples/core` example for details.

Unfortunately, the core build is not yet available on NPM. There is no technical
reason for this, it just hasn't been contributed yet.
