.PHONY: clean serve

index.html:
	python gen_html.py index.jinja2 -o index.html -s trac

serve:
	python -m SimpleHTTPServer 8000 .

clean:
	rm index.html
