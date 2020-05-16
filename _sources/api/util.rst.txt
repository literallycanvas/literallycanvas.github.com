Utilities
=========

.. js:function:: LC.util.addImageOnload(image, callback)

  .. versionadded: 0.4.9

  Ensures **callback** is called when the image loads, without replacing any
  existing callbacks.

.. js:function:: LC.util.classSet({className: bool})

  Replaces ``React.addons.classSet``.

.. js:function:: LC.util.combineCanvases(a, b)

  :returns: A canvas containing *b* rendered on top of *a*, sized to contain
            both *a* and *b*.[]

.. js:function:: LC.util.getBackingScale()

  :returns: ``window.devicePixelRatio`` if it exists and is greater than 1;
            otherwise, returns 1.

.. js:function:: LC.util.getBoundingRect(rects)

  :param rects: List of dicts with keys ``{x, y, width, height}``.

  :returns: The smallest rectangle that contains the given rectangles, in the
           form ``{x, y, width, height}``.

.. js:function:: LC.util.getGUID()

  :returns: a globally unique ID string

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
  for environments with ``devicePixelRatio != 1``.)

.. js:function:: LC.util.getDefaultImageRect(shapeBoundingRects, explicitSize={width: 0, height: 0}, margin={top: 0, right: 0, bottom: 0, left: 0})
  
  Returns the effective bounds of the canvas. Mostly used as a convenient way
  to limit the scope of a potentially infinite tool. (For example, a paint
  bucket shouldn't fill infinite pixels.)

.. js:function:: LC.util.renderShapes(shapes, bounds, scale=1, canvas=null)

  .. deprecated:: 0.4.5

  Duplicate of :js:func:`LC.renderShapesToCanvas`
