.PHONY : perms
pre : perms
perms :
	chmod +x $(wildcard *.sh *.pl)