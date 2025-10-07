#!/usr/bin/env bash
set -e
for f in neo/neo index; do
	npx html-minifier --collapse-whitespace --remove-comments "$f.html" -o "$f.html" \
	&& cp "$f.html" "$f.md"
done
