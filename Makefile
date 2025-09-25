.PHONY : all

HAML := $(wildcard *.haml)
HTML := $(patsubst %.haml,%.html,$(HAML))
SCSS := $(wildcard *.scss)
CSS := $(patsubst %.scss,%.css,$(SCSS))
TS := $(wildcard *.ts)
JS := $(patsubst %.ts,%.js,$(TS))

all : $(CSS) $(JS) $(HTML) README.md
%.css : %.scss
	@npx sass $< $@
%.js : %.ts
	@tsc $< --target esnext
%.html : %.haml build.rb
	@ruby build.rb $< $@
README.md : README.html
	@cat README.html > README.md