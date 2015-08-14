API
===

.. toctree::
  :maxdepth: 2

  initializing.rst
  LiterallyCanvas.rst
  events.rst
  shapes.rst
  tools.rst
  util.rst
  localization.rst

Uncategorized functions
-----------------------

.. js:function:: LC.registerJQueryPlugin(_$)

  Enable the jQuery plugin on the given instance of jQuery. You only need to
  call this if ``window.$`` does not exist or you want to use a different
  instance of ``$``.

.. js:function:: LC.setDefaultImageURLPrefix(defaultImageURLPrefix)

  :param defaultImageURLPrefix:

    Global default value of :ref:`imageURLPrefix <opt-imageURLPrefix>`.

  Set the global default value of :ref:`imageURLPrefix <opt-imageURLPrefix>`.
  This function is useful when you're making a web site with many instances of
  Literally Canvas (like, for example, this documentation).

Summary
-------

* :js:func:`LC.init`
* :js:func:`$.literallycanvas`
* :js:class:`LiterallyCanvas`
* :js:func:`LC.createShape`
* :js:func:`LC.defineShape`
* :js:func:`LC.JSONToShape`
* :js:func:`LC.renderShapesToCanvas`
* :js:func:`LC.renderShapesToSVG`
* :js:func:`LC.snapshotJSONToShapes`
* :js:func:`LC.snapshotToShapes`
* :js:func:`LC.defineOptionsStyle`
* :js:func:`LC.registerJQueryPlugin`
* :js:func:`LC.setDefaultImageURLPrefix`
* :doc:`LC.util <util>`
* :js:func:`LC.localize`
