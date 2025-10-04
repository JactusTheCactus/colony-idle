PAGES := $(wildcard *.html *.md)
SCSS := $(wildcard *.scss)
CSS := $(SCSS:.scss=.css)
TS := $(wildcard *.ts)
JS := $(TS:.ts=.js)
main : $(CSS) $(JS) $(PAGES)
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