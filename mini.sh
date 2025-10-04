#!/bin/bash
npx html-minifier --collapse-whitespace --remove-comments neo.html -o neo.min.html
for f in neo.html neo.min.html; do
	cp "$f" "${f%.html}.md"
done