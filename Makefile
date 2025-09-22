.PHONY : all build

PY := python3

all : build

build : data.yaml script.py
	@$(PY) script.py