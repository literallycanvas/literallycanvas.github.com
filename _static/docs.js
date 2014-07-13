window.imgurClientId = 'f32c6385c66b037';
$(document).ready(function(){
  if (window.READTHEDOCS_DATA) {
    LC.setDefaultImageURLPrefix(
      '/' + READTHEDOCS_DATA.language +
      '/' + READTHEDOCS_DATA.version +
      '/_static/lib/img');
  } else {
    LC.setDefaultImageURLPrefix('/_static/lib/img');
  }
})
