.PHONY : clean format post

post : format
format :
	npx prettier . --write > /dev/null