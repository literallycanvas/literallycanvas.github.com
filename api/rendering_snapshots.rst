Rendering shapshots
===================

.. js:function:: LC.renderSnapshotToImage(snapshot, options)

  .. versionadded:: 0.4.9

  Render the snapshot to a canvas. To turn the result into an image URL,
  call ``toDataURL()`` on the result.

  **Options**

  ``rect``
    A dict ``{x, y, width, height}`` specifying which part of the image to
    draw, in drawing coordinates (before scaling). Defaults to the bounding
    box of all shapes. If you don't specify a ``rect`` and there are no
    shapes in the drawing, :js:func:`getImage` will return ``undefined``.

  ``margin``
    A dict ``{top, right, bottom, left}`` defaulting to ``null``. If the
    image's bounds are determined by the shapes' bounding rect (i.e. ``rect``
    is not given), this dict determines the amount of space on each side.

  ``scale``
    Amount by which to scale the image output. Shapes will be rendered at
    full resolution. Defaults to ``1``.

  ``watermarkImage``
    Image to render in the center behind everything, unaffected by erasers.

  ``watermarkScale``
    Scale of the watermark.


.. js:function:: LC.renderSnapshotToSVG(snapshot, options)

  .. versionadded:: 0.4.9

  Render the snapshot to an SVG string that can be inserted into the DOM or
  downloaded.

  .. warning::

    SVG export does not currently support watermarks, scale, or eraser shapes.

  **Options**

  ``rect``
    A dict ``{x, y, width, height}`` specifying which part of the image to
    draw, in drawing coordinates (before scaling). Defaults to the bounding
    box of all shapes. If you don't specify a ``rect`` and there are no
    shapes in the drawing, :js:func:`getImage` will return ``undefined``.

  ``margin``
    A dict ``{top, right, bottom, left}`` defaulting to ``null``. If the
    image's bounds are determined by the shapes' bounding rect (i.e. ``rect``
    is not given), this dict determines the amount of space on each side.
