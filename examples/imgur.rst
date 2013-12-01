Uploading to Imgur
==================

The "Upload to Imgur" button will anonymously upload the contents of the canvas
to Imgur and redirect you to its page.

.. raw:: html

    <div class="literally imgur"><canvas></canvas></div>

    <form class="imgur-submit">
        <input type="submit" data-action="upload-to-imgur" value="Upload to Imgur">
    </form>

    <script>
      $('.literally.imgur').literallycanvas({
        backgroundColor: 'whiteSmoke',
        imageURLPrefix: '/_static/lib/img',
        onInit: function(lc) {

          $('[data-action=upload-to-imgur]').click(function(e) {
            e.preventDefault();
            $('.imgur-submit').html('Uploading...')
            // this is all bog standard Imgur API; only LC-specific thing is the
            // image data argument
            $.ajax({
              url: 'https://api.imgur.com/3/image',
              type: 'POST',
              headers: {
                Authorization: 'Client-ID ' + imgurClientId,
                Accept: 'application/json'
              },
              data: {
                image:  lc.canvasForExport().toDataURL().split(',')[1],
                type: 'base64'
              },
              success: function(result) {
                window.location = 'https://imgur.com/gallery/' + result.data.id;
              },
            });
          })

        }
      });
    </script>
