About
=====

Literally Canvas is an extensible, open source (BSD-licensed), HTML5 drawing
widget. It depends on jQuery.

You can draw, erase, set the color with the eyedropper, undo, redo, pan, and
zoom. A semi-stable API allows you to add your own tools.

It's easy to get a data URL for upload to a site like Imgur or load/save a
user's drawing.

.. raw:: html

    <div class="literally"><canvas></canvas></div>

Why?
====

If you look at :ref:`related-projects` at the bottom of the page, you can see
that this isn't the only HTML5 drawing tool on the block. However, it is unique
in several ways:

* **It's open source.** Other drawing tools seem to be almost exclusively
  provided by businesses whose core feature is their drawing tool or
  freelancers who want you to pay them to adapt their work to your use case. We
  have nothing against those people, but it's important that free alternatives
  exist.

* **It's a widget, not an application.** Literally Canvas is intended to live
  inside your application in the way that works best for you. It doesn't take
  over your screen. It doesn't (intentionally) gobble up events. It tries to
  keep its UI to a minimum.

* **It wants to be extended.** We've tried to design it with extensibility in
  mind. There's no formal tool API, but if you have specific needs, we think
  it's easy enough to read the source and figure out how to add what you want.
  We hope to improve and expose the tool API in future releases.

* **It's fast and looks good.** Literally Canvas is optimized to work with
  complex drawings, and it smooths lines naturally to avoid the unsightly line
  angles often seen in simplistic drawing programs.

Literally Canvas was created in part to replace the object drawing tool in
`Buildy`_. We hope you're inspired to use it to make new things of your own!

.. _Buildy: http://playbuildy.com

.. toctree::
    :maxdepth: 3

Browser compatibility
=====================

=========== =====================
Chrome      Awesome
Safari      Awesome
iOS         Some zooming glitches
Firefox     23+ [#f1]_
Opera       ??
Android     ??
IE          10+
=========== =====================

.. rubric:: Footnotes

.. [#f1] Works in previous versions, but the brush size slider will render
         as a text field.

Contributing
============

We would be excited to see contributions of any form. New brushes,
optimizations, feature requests, use cases, designs, bug reports – you name it,
we want it! Just head on over to `GitHub`_ and get started.

.. _GitHub: http://github.com/literallycanvas/literallycanvas

One particular area where we'd like some help is in styling the toolbar. If
glitzy CSS-based UI is your thing, we'd love to hear your suggestions or merge
your pull requests.

.. _related-projects:

Related projects
================

The web has only recently arrived at the point where this sort of project is
feasible to implement without Flash, but there are several other projects with
similar features. If Literally Canvas isn't quite what you're looking for, we
encourage you to check them out and give them some love. All of them use

* `drawingboard.js <http://leimi.github.io/drawingboard.js/>`_: Very similar
  project, slightly different feature set. Less of a focus on high-quality
  drawing algorithms.
* `DeviantArt Muro <http://sta.sh/muro/>`_: Sophisticated, comprehensive
  drawing
* `Bomomo <http://bomomo.com/>`_: Whimsical doodling
* `SketchPad <http://mudcu.be/sketchpad/>`_: Simple drawing
* `sketchpad.io <http://sketchpad.io/>`_: Non-destructive, 2.0 version of
  SketchPad
* `Sketch.js <https://github.com/mudcube/Sketch.js>`_: Simplistic, open source
  version of `sketchpad.io <http://sketchpad.io/>`_
* `Sketch <http://hakim.se/experiments/html5/sketch/>`_: Cartoon-style sketches
  with gallery
* `Zwibbler <http://zwibbler.com/>`_: Vector graphics
* `FigurePool <http://figurepool.com/editor>`_: SVG diagramming
* `SVG-edit <http://svg-edit.googlecode.com/svn/trunk/editor/svg-editor.html>`_:
  Open source SVG non-destructive drawing
* `Method Draw <http://editor.method.ac/>`_: SVG non-destructive drawing, based
  on SVG-edit
* `Creating a Drawing App with HTML5 Canvas and Javascript <http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/>`_:
  Learn a bit about how to do these things yourself!
