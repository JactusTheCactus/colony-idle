.PHONY : all build

PY := python3
STYLE := style

all : build
build :
	@$(PY) script.py
	@sass $(STYLE).scss $(STYLE).css