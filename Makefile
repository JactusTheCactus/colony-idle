.PHONY : all build

PY := python3

all : build

build : $(wildcard *.yaml)
	@$(PY) script.py