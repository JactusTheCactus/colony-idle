#!/usr/bin/env bash
for f in neo; do
	npx html-minifier --collapse-whitespace --remove-comments $f.html -o $f.min.html
	for m in ".min" ""; do
		cp "$f$m.html" "$f$m.md"
	done
done