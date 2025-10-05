#!/usr/bin/env bash
BUILD=just
FILE=${BUILD}Log.md
eval "$BUILD > $FILE"
cat $FILE
