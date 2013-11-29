var imgurClientId = 'f32c6385c66b037';

/* front page */
(function() {
  $(document).ready(function() {
    $('.literally.index').literallycanvas({
      backgroundColor: 'whiteSmoke',
      imageURLPrefix: '/_static/lib/img'
    });
  });
}).call(this);

/* imgur */
(function() {
  $(document).ready(function() {
    $('.literally.imgur').literallycanvas({
      backgroundColor: 'whiteSmoke',
      imageURLPrefix: '/_static/lib/img',
      onInit: function(lc) {

        $('[data-action=upload-to-imgur]').click(function(e) {
          e.preventDefault();
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
  });
}).call(this);
