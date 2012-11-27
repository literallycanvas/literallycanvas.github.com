$(document).ready ->
  # initialize with a background color and an Imgur key
  lc = $('.literally').literallycanvas
    backgroundColor: 'whiteSmoke'
    imgurKey: '9600756ae5f127ca192d991140ee28c4'

  el = $('.share-to-imgur').get(0)
  $el = $(el)
  $button = $el.find('button')
  $urlEl = $el.find('.imgur-url')
  $button.click (e) =>
    $urlEl.html('Uploading...')
    $button.attr('disabled', 'disabled')
    lc.uploadCanvasToImgur().done((url) =>
      $el.find('.imgur-url').html($('<a href="' + url + '">' + url + '</a>'))
    ).fail((msg) =>
      $urlEl.html(_.escape(msg))
    ).always(() =>
      $button.removeAttr('disabled')
    )

  $('.get-image').click (e) =>
    window.open $('.literally').canvasForExport().toDataURL()

  # courtesy of jQuery UI
  $('.literally').resizable();
