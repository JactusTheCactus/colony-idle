PAGES := $(wildcard *.html *.md)
SCSS := $(wildcard *.scss)
TS := $(wildcard *.ts)
main : $(SCSS:.scss=.css) $(TS:.ts=.js) $(PAGES)
%.css : %.scss
	npx sass $< $@
	rm -rf $@.map
%.js : %.ts
	npx tsc $< \
		--target esnext \
		--skipLibCheck true
%.html : %.pug
	echo $@
	node page.js $@
%.md : %.pug
	echo $@
	node page.js $@