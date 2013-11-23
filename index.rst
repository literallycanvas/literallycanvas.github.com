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
----

If you look at Related Projects at the bottom of the page, you can see that
this isn't the only HTML5 drawing tool on the block. However, it is unique in
several ways:

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

Literally Canvas was created in part to replace the object drawing tool in
`Buildy`_. We hope you're inspired to use it to make new things of your own!

.. _Buildy: http://playbuildy.com

.. toctree::
    :maxdepth: 3
