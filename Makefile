default: clean submodules dist

dist: d.js dwarfton.js
	@mv -f *.js dist/

dwarfton.js: src/DWARFTON.js src/LIBS.js src/CPU.js 
	@utils/build.sh $@ $+

d.js: dwarfton.js
	@utils/sed-minify/minifyjs $+ > $@
	
submodules:
	@git submodule update --init --recursive

clean:
	@rm -f *.js dist/*
