#!/bin/bash
npx html-minifier --collapse-whitespace --remove-comments neo.html -o neo.min.html
cp neo{.min,}.html neo{.min,}.md