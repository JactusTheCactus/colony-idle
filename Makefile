.PHONY : all build

PY := python3

SCRIPT := script.py
DATA := data.yaml

all : build

build :
	@$(PY) $(SCRIPT)