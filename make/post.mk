.PHONY : format
post : format
format :
	./clean.pl
	./mini.sh
	npx prettier . --write