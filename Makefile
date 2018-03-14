DWARFTON=\
	src/D.js \
	src/W.js \
	src/A.js \
	src/R.js \
	src/F.js \
	src/T.js \
	src/O.js \
	src/N.js \
	src/L.js \
	src/I.js \
	src/B.js \
	src/S.js \
	src/C.js \
	src/P.js \
	src/U.js

default: clean submodules dist

dist: d.js
	@mv -f *.js dist/

dwarfton.js: $(DWARFTON) 
	@utils/build.sh $@ $+

d.js: dwarfton.js
	@utils/sed-minify/minifyjs $+ > $@
	
submodules:
	@git submodule update --init --recursive

clean:
	@rm -f *.js dist/*
