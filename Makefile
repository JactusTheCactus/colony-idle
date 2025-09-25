.PHONY : all

HAML := $(wildcard *.haml)
HTML := $(patsubst %.haml,%.html,$(HAML))

SCSS := $(wildcard *.scss)
CSS := $(patsubst %.scss,%.css,$(SCSS))

TS := $(wildcard *.ts)
JS := $(patsubst %.ts,%.js,$(TS))

all : $(CSS) $(JS) $(HTML)

%.css : %.scss
	@npx sass $< $@

%.js : %.ts
	@tsc $< --target esnext

%.html : %.haml
	@haml $< > $@