.PHONY : all build run

PY := python3
DEV := false
#-include dev.mk

all : build run
build : README.md style.css script.js index.html
README.md : script.py
	@$(PY) script.py
style.css : style.scss
	@npx sass style.scss style.css
script.js : script.ts
	@tsc script.ts --target esnext
index.html : index.haml
	@haml index.haml > index.html
run :
ifeq ($(DEV),true)
	@php -S localhost:
endif