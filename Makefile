# Makefile for Sphinx documentation
#

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = poetry run sphinx-build
PAPER         =
BUILDDIR      = _build

# Internal variables.
ALLSPHINXOPTS   = -d $(BUILDDIR)/doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) .

.PHONY: help clean html dirhtml singlehtml livehtml

clean:
	-rm -rf $(BUILDDIR)/*

rm-crud:
	@find . -name .#* -delete
	@find . -name ._* -delete

html: rm-crud
	$(SPHINXBUILD) -b html $(ALLSPHINXOPTS) $(BUILDDIR)/html
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/html."

livehtml: html
	livereload $(BUILDDIR)/html -p 33234

dirhtml: rm-crud
	$(SPHINXBUILD) -b dirhtml $(ALLSPHINXOPTS) $(BUILDDIR)/dirhtml
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/dirhtml."

singlehtml: rm-crud
	$(SPHINXBUILD) -b singlehtml $(ALLSPHINXOPTS) $(BUILDDIR)/singlehtml
	@echo
	@echo "Build finished. The HTML page is in $(BUILDDIR)/singlehtml."

deploy: clean html
	cp googlebe81353f5272462b.html $(BUILDDIR)/html/googlebe81353f5272462b.html
	cp CNAME $(BUILDDIR)/html/CNAME
	cp README_build.md $(BUILDDIR)/html/README.md
	git fetch origin
	poetry run ghp-import -n -p -r origin -b master $(BUILDDIR)/html
