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

        $('a[data-action=upload-to-imgur]').click(function(e) {
          localStorage.doUpload = true;
          localStorage.imageBase64 = lc.canvasForExport().toDataURL().split(',')[1];
        })

        var extractToken = function(hash) {
          var match = hash.match(/access_token=(\w+)/);
          return !!match && match[1];
        };

        var token = extractToken(document.location.hash);
        console.log(token, localStorage.doUpload);
        if (token && JSON.parse(localStorage.doUpload)) {
          localStorage.doUpload = false;
          console.log("do upload");
          $.ajax({
            url: 'https://api.imgur.com/3/image',
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + token,
              Accept: 'application/json'
            },
            data: {image: localStorage.imageBase64, type: 'base64'},
            success: function(result) {
              var id = result.data.id;
              window.location = 'https://imgur.com/gallery/' + id;
            }
          });
        }
      }
    });
  });
}).call(this);
