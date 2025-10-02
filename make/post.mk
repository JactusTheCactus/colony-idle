.PHONY : format
post : format
format :
	npx prettier . --write
	./clean.pl
	./mini.sh