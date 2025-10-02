#!/bin/bash
html-minifier --collapse-whitespace --remove-comments neo.html -o neo.min.html
cp neo.html neo.md
cp neo.min.html neo.min.md