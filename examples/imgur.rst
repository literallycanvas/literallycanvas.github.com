Uploading to Imgur
==================

This example demonstrates how you might integrate Literally Canvas with a
service like Imgur. The "Upload to Imgur" button will anonymously upload the
contents of the canvas to Imgur and redirect you to its page.

Note that unless you set a background color in the color picker, the exported
image will have a transparent background, which will be drawn against a dark
background on Imgur's site.

.. raw:: html
    :file: _imgur.html

.. literalinclude:: _imgur.html
    :language: html
    :emphasize-lines: 13-34
