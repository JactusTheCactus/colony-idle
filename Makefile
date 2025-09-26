.PHONY : all format clean pug

PUG := $(wildcard *.pug)
PAGE := $(PUG:.pug=.html) $(PUG:.pug=.md)
SASS := $(wildcard *.scss)
STYLE := $(SASS:.scss=.css)
TS := $(wildcard *.ts)
SCRIPT := $(TS:.ts=.js)

trash = $(wildcard *.map .sass-cache)

all : $(STYLE) $(SCRIPT) pug format clean
%.css : %.scss
	@npx sass $< $@
%.js : %.ts
	@tsc $< \
		--target esnext \
		--module nodenext \
		--esModuleInterop false \
		--forceConsistentCasingInFileNames true \
		--strict true \
		--skipLibCheck true \
		--moduleResolution nodenext
pug : $(PUG) page.js
	@node page.js
format :
	@npx prettier . --write > /dev/null
clean :
	@rm -rf $(trash)