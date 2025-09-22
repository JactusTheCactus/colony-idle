.PHONY : all build

PY := python3

all : build

build : $(wildcard *.yaml *.py)
	@$(PY) script.py