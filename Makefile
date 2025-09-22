.PHONY : all build

PY := python3
SCRIPT := script.py
DATA := data.yaml
README := README.md

all : build
build :
	@$(PY) $(SCRIPT)