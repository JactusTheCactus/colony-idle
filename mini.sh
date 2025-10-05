#!/usr/bin/env bash
npx html-minifier --collapse-whitespace --remove-comments neo.html -o neo.min.html
for f in (neo); do
	for m in (".min" ""); do
		cp "${f}${m}.html" "${f}${m}.md"
	done
done