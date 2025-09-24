.PHONY : all build run

PY := python3
DEV := false
#-include dev.mk

all : build run
build : README.md style.css script.js output.html
README.md : script.py
	@$(PY) script.py
style.css : style.scss
	@npx sass style.scss style.css
script.js : script.ts
	@tsc script.ts --target esnext
output.html : input.haml
	haml compile --input input.haml --output output.html
run :
ifeq ($(DEV),true)
	@php -S localhost:
endif