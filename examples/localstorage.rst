Saving to Local Storage
=======================

Draw a picture, then reload the page. Your drawing is saved!

.. raw:: html

    <div class="literally localstorage"><canvas></canvas></div>

    <script>
      $(document).ready(function() {
        $('.literally.localstorage').literallycanvas({
          backgroundColor: 'whiteSmoke',
          imageURLPrefix: '/_static/lib/img',
          onInit: function(lc) {
            if (localStorage.getItem('drawing')) {
              lc.loadSnapshotJSON(localStorage.getItem('drawing'));
            }
            lc.on('drawingChange', function() {
              localStorage.setItem('drawing', lc.getSnapshotJSON());
            });
          }
        });
      });
    </script>
