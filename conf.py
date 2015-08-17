# -*- coding: utf-8 -*-
import os
from better import better_theme_path

READ_THE_DOCS = os.environ.get('READTHEDOCS', None) == 'True'

needs_sphinx = '1.0'

extensions = []
intersphinx_mapping = {}

templates_path = ['_templates']
exclude_patterns = ['_build']
source_suffix = '.rst'
#source_encoding = 'utf-8-sig'
master_doc = 'index'
pygments_style = 'sphinx'

# project info

project = u'Literally Canvas'
copyright = u'2012-2015 Literally Canvas contributors'
# The short X.Y version. Can refer to in docs with |version|.
version = '0.4.6'
# The full version, including alpha/beta/rc tags.
# Can refer to in docs with |release|.
release = '0.4.6'
#language = None


html_theme_path = [better_theme_path]
html_static_path = ['_static']
html_theme = 'better'
html_theme_options = {
    'cssfiles': [
        'http://fonts.googleapis.com/css?family=Finger+Paint',
        '_static/style.css',
        '_static/lib/css/literallycanvas.css',
    ],
    'scriptfiles': [
        "//cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react-with-addons.js",
        "_static/lib/js/fastclick.js",
        "_static/lib/js/literallycanvas.js",
        '_static/docs.js',
    ]
}

html_context = {}
html_sidebars = {
    '**': [
        'localtoc.html', 'sidebarhelp.html', 'searchbox.html'],
    'index': [
        'globaltoc.html', 'sidebarhelp.html', 'searchbox.html'],
}

html_title = "%(project)s v%(release)s docs - HTML5 drawing board - MS Paint in your web browser" % {
    'project': project, 'release': release}
html_short_title = "Home"

if not READ_THE_DOCS:
    html_theme_options['ga_ua'] = 'UA-36534121-1'
    html_theme_options['ga_domain'] = 'literallycanvas.com'

# Necessary for best search results
html_show_sourcelink = True

# Output file base name for HTML help builder.
htmlhelp_basename = 'lcdoc'
