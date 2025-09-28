.PHONY : perms
pre : perms
perms :
	chmod -R +x $(wildcard *.pl *.sh)