.. _saving-and-loading:

Saving to Local Storage
=======================

Literally Canvas can serialize the user's drawing as a Javascript object.
Generally, you probably want to do this in response to events.

Here's a complete example that saves the drawing to ``localStorage`` so that
when the user refreshes the page, the drawing persists.

.. raw:: html
    :file: _localstorage.html

.. literalinclude:: _localstorage.html
    :language: html
    :emphasize-lines: 9-15
