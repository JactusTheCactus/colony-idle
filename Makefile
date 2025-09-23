.PHONY : all build run

PY := python3
STYLE := style
DEV := false
#include dev.mk

all : build run
build :
	@$(PY) script.py
	@sass $(STYLE).scss $(STYLE).css
run :
ifeq ($(DEV),true)
	@php -S localhost:
endif