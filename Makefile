.PHONY : all pre main post
#.SILENT :
.ONESHELL :
all : pre main post
include make/pre.mk
include make/main.mk
include make/post.mk