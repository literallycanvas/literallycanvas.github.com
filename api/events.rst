Events
======

The :js:class:`LiterallyCanvas` object allows you to subscribe to several
events. Here's how:

.. code-block:: javascript

  var unsubscribe = lc.on('eventName', function(arguments) {
    // do stuff
  });
  unsubscribe();  // stop listening

See :ref:`event_subscription` for details.

Definition format
-----------------

``eventName`` *(function signature)*
  Description

Drawing changes
---------------

.. _event_drawingChange:

``drawingChange`` *()*
  The drawing just changed in some way. This is a catch-all event that is fired
  after each of the other events in this section except for
  ``primaryColorChange`` and ``secondaryColorChange``, which don't actually
  change the drawing.

.. _event_shapeSave:

``shapeSave`` *({shape, previousShapeId})*
  A new shape was just added to the drawing above *previousShapeId*.

.. _event_snapshotLoad:

``snapshotLoad`` *()*
  A snapshot was just loaded.

.. _event_clear:

``clear`` *()*
  The drawing was just cleared.

.. _event_undo:

``undo`` *()*
  The last action was undone.

.. _event_redo:

``redo`` *()*
  An undone action was reapplied.

.. _event_primaryColorChange:

``primaryColorChange`` *(newColor)*
  The primary color was just changed.

.. _event_secondaryColorChange:

``secondaryColorChange`` *(newColor)*
  The secondary color was just changed.

.. _event_backgroundColorChange:

``backgroundColorChange`` *(newColor)*
  The background color was just changed.

Tool state
----------

Three types events are fired during the lifecycle of a tool operation. Each
tool has a different set of properties, but the tools are passed as arguments
to the event handler.

``drawStart`` *({tool})*

``drawContinue`` *({tool})*

``drawEnd`` *({tool})*

``toolChange`` *({tool})*
  The given tool has just been made active.

View changes
------------

``pan`` *({x, y})*
  The view has been panned to the given coordinates.

``zoom`` *({oldScale, newScale})*
  The view has been zoomed from *oldScale* to *newScale*.

``repaint`` *({layerKey})*
  The *layerKey* layer has just been repainted. The actual value of *layerKey*
  is not stable, but interpreting it won't kill you.

Pointer
-------

.. note::

  These didn't have the ``lc-`` prefix from v.4.5-0.4.7, until someone realized
  they conflict with Internet Explorer's one-browser-wonder pointer events
  standard.

``lc-pointerdown`` *({x, y})*
  The mouse button has just pressed down or a touch has begun.

``lc-pointerup`` *({x, y})*
  The mouse button has just released or a touch has ended.

``lc-pointermove`` *({x, y})*
  The mouse moved while the mouse button was not pressed.

``lc-pointerdrag`` *({x, y})*
  The mouse moved while the mouse button was pressed, or a touch moved.
