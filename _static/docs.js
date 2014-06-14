window.imgurClientId = 'f32c6385c66b037';
if (window.READTHEDOCS_DATA) {
  LC.setDefaultImageURLPrefix('/_static/lib/img');
} else {
  LC.setDefaultImageURLPrefix(
    '/' + READTHEDOCS_DATA.language +
    '/' + READTHEDOCS_DATA.version +
    '/_static/lib/img');
}
