Literally Canvas
================

Literally Canvas is an extensible, open source (BSD-licensed), HTML5 drawing
widget. Its only dependency is `React.js`_. You can use it to embed drawing
boards in web pages. It's kind of like an extensible MS Paint in JavaScript.
Users can sketch drawings and you can do what you like with the results.
comes with an easy-to-use jQuery plugin.

.. _React.js: http://facebook.github.io/react/

.. raw:: html

    <div class="my-drawing"></div>

    <script>
      $(document).ready(function() {
        $('.my-drawing').literallycanvas({
          backgroundColor: 'whiteSmoke'
        });
      });
    </script>

Literally Canvas's major features include:

* Basic drawing tools
* An API to add more drawing tools
* Panning and zooming
* Constant-size or infinite canvases
* Background images/shapes and watermarks
* Retina support
* Saving and loading JSON
* Exporting drawings to PNG and SVG
* Events

You can donate to Literally Canvas's development on `Gratipay`_ or post a
bounty on a GitHub issue on `Bountysource`_. Spontaneous improvements are rare
otherwise, though they do happen.

.. _Gratipay: https://gratipay.com/~irskep/

.. _Bountysource: https://www.bountysource.com/teams/literallycanvas/issues

.. toctree::
    :maxdepth: 3

    installing.rst
    api/index.rst
    examples/index.rst

Why?
====

* **It's open source.** It's developed by the community for many purposes and
  is free to use and extend.

* **It's a widget, not an application.** Literally Canvas is intended to live
  inside your application in the way that works best for you.

* **It wants to be extended.** There is a public API for adding new shapes and
  tools.

* **It's fast and looks good.** Literally Canvas is optimized to work with
  complex drawings, and it smooths lines naturally to avoid the unsightly line
  angles often seen in simplistic drawing programs.

Browser compatibility
=====================

=========== === =================================
Chrome      √
Safari      √
iOS         √   FastClick helps [#f1]_
Firefox 4+  √
IE 10+      √   Line dashes only supported in 11+
Opera       ??
Android     ??
=========== === =================================

.. rubric:: Footnotes

.. [#f1] iOS delays click events so that it can detect gestures. To disable
         this behavior and get those events immediately, use `FastClick`_.

.. _FastClick: https://github.com/ftlabs/fastclick

Contributing
============

We are excited to see contributions of any form. New brushes, optimizations,
feature requests, use cases, designs, bug reports – you name it, we want it!
Just head on over to `GitHub`_ and get started.

.. _GitHub: http://github.com/literallycanvas/literallycanvas

Literally Canvas is developed by volunteers for fun. If missing features or
compatibility are serious issues for you, the solution to your problem might be
to help us write the code.


Thanks to BrowserStack
======================

.. image:: _static/browserstack.png

`BrowserStack`_ has generously donated resources to ensure that Literally
Canvas works in as many environments as possible. If you care about your app's
compatibility, you should check it out.

.. _Browserstack: http://browserstack.com
