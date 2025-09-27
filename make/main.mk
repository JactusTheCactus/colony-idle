.PHONY : main

PUG := $(wildcard *.pug)
SCSS := $(wildcard *.scss)
TS := $(wildcard *.ts)

PAGES = $(PUG:.pug=.html) $(PUG:.pug=.md)
STYLES = $(SCSS:.scss=.css)

main : $(STYLES) $(TS:.ts=.js) $(PAGES)
%.css : %.scss
	npx sass $< $@
	rm -rf $@.map
%.js : %.ts
	tsc $< \
		--target esnext \
		--skipLibCheck true
$(PAGES) &: $(PUG) page.js
	node page.js