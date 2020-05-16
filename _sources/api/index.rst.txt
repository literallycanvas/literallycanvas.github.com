API
===

.. toctree::
  :maxdepth: 2

  initializing.rst
  LiterallyCanvas.rst
  rendering_snapshots.rst
  events.rst
  shapes.rst
  tools.rst
  util.rst
  localization.rst

Uncategorized functions
-----------------------

.. js:function:: LC.registerJQueryPlugin(_$)

  .. deprecated:: 0.4.14

  Enable the jQuery plugin on the given instance of jQuery. As of 0.4.14,
  you'll need to do this for the jQuery plugin to work at all.

.. js:function:: LC.setDefaultImageURLPrefix(defaultImageURLPrefix)

  :param defaultImageURLPrefix:

    Global default value of :ref:`imageURLPrefix <opt-imageURLPrefix>`.

  Set the global default value of :ref:`imageURLPrefix <opt-imageURLPrefix>`.
  This function is useful when you're making a web site with many instances of
  Literally Canvas (like, for example, this documentation).

.. js:attribute:: LC.defaultTools()

  The array of default tools.

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
* :js:func:`LC.renderSnapshotToImage`
* :js:func:`LC.renderSnapshotToSVG`
* :js:func:`LC.snapshotJSONToShapes` (deprecated)
* :js:func:`LC.snapshotToShapes`
* :js:attr:`LC.defaultTools`
* :js:func:`LC.defineOptionsStyle`
* :js:func:`LC.registerJQueryPlugin`
* :js:func:`LC.setDefaultImageURLPrefix`
* :js:func:`LC.localize`
* :doc:`LC.util <util>`
