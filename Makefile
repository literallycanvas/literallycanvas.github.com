.PHONY: clean serve

index.html: index.jinja2
	python gen_html.py index.jinja2 -o index.html -s trac

js/docs.js: docs.coffee
	coffee -o js/docs.js -c docs.coffee

serve:
	python -m SimpleHTTPServer 8000 .

clean:
	rm index.html
