.PHONY : all format clean pug test

SASS := $(wildcard *.scss)
TS := $(wildcard *.ts)

all : $(SASS:.scss=.css) $(TS:.ts=.js) pug format clean
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
pug : $(wildcard *.pug) page.js
	@node page.js
format :
	@npx prettier . --write > /dev/null
clean :
	@rm -rf $(wildcard *.map .sass-cache)