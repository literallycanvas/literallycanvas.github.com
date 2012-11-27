uploadToImgur = ($lc, imgurKey) ->
  opts = _.extend({
    name: 'drawing.png'
    title: 'A Drawing'
    caption: 'Drawn with Literally Canvas - http://steveasleep.com/literallycanvas'
  }, opts)

  d = new $.Deferred()
  unless imgurKey
    d.reject("This application is not configured to support Imgur.")
    d.promise()
    return d

  # cheating a bit, this isn't documented
  unless $lc.get(0).literallycanvas.shapes.length
    d.reject("You haven't drawn anything.")
    d.promise()
    return d

  img = $lc.canvasForExport().toDataURL().split(',')[1]

  # upload to imgur using jquery/CORS
  # https://developer.mozilla.org/En/HTTP_access_control
  $.ajax
      url: 'http://api.imgur.com/2/upload.json',
      type: 'POST',
      data: {
          type: 'base64',
          key: imgurKey,
          name: opts.name,
          title: opts.title,
          caption: opts.caption,
          image: img
      },
      dataType: 'json'
      success: (data) ->
        d.resolve(data.upload.links.imgur_page)
      error: (rsp) ->
        d.reject("Image upload failed.")
        console.log(rsp)

  d.promise()
  return d


$(document).ready ->
  # initialize with a background color and an Imgur key
  $lc = $('.literally').literallycanvas
    backgroundColor: 'whiteSmoke'

  el = $('.share-to-imgur').get(0)
  $el = $(el)
  $button = $el.find('button')
  $urlEl = $el.find('.imgur-url')
  $button.click (e) =>
    $urlEl.html('Uploading...')
    $button.attr('disabled', 'disabled')
    uploadToImgur($lc, '9600756ae5f127ca192d991140ee28c4').done((url) =>
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
