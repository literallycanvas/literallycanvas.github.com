Utilities
=========

.. js:function:: LC.util.last(array, n=null)

  Get the last element of an array. Pass *n* to get a list of the last *n*
  elements.

.. js:function:: LC.util.matchElementSize(elementToMatch, elementsToResize, scale, callback=null)

  :param elementToMatch:
      DOM element whose size should be matched by *elementsToResize*

  :param elementsToResize:
      Array of DOM elements to update

  :param scale:
      Amount to scale ``width`` and ``height`` attributes if one of
      *elementsToResize* is a canvas element

  :param callback:
      Function to be called after each resize event

  Keep *elementsToResize* the same size as *elementToMatch*. If one of
  *elementsToResize* is a ``<canvas>``, set its ``width`` and ``height``
  properties to the element's size multiplied by *scale*. (This is necessary
  for environments with ``devicePixelWidth != 1``.)

.. js:function:: LC.util.combineCanvases(a, b)

  :returns: A canvas containing *b* rendered on top of *a*, sized to contain
            both *a* and *b*.

.. js:function:: LC.util.renderShapes(shapes, bounds, scale=1, canvas=null)

  :param shapes: List of shapes

  :param bounds:
      A dict ``{x, y, width, height}`` specifying which part of the image to
      draw, in drawing coordinates (before scaling).

  :param scale:
      Amount by which to scale the image output. Shapes will be rendered at
      full resolution. Defaults to ``1``.

  :param canvas:
      Canvas object on which to render the shapes. If ``null``, a new canvas
      will be created with the size specified by *bounds*.

.. js:function:: LC.util.getBoundingRect(rects)

  :param rects: List of dicts with keys ``{x, y, width, height}``.

  :returns: The smallest rectangle that contains the given rectangles, in the
           form ``{x, y, width, height}``.

.. js:function:: LC.util.getBackingScale()

  :returns: ``window.devicePixelRatio`` if it exists and is greater than 1;
            otherwise, returns 1.
