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
%.html : %.pug page.ts
	echo $@
	node page.js $@
%.md : %.pug page.ts
	echo $@
	node page.js $@