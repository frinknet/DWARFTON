default: clean submodules dist

dist: d.js d-basic.js d-libs.js d-cpu.js
	@mv -f *.js dist/

dwarfton.js: src/DWARFTON.js src/LIBS.js src/CPU.js 
	@utils/build.sh $@ $+

dwarfton-basic.js: src/DWARFTON.js
	@utils/build.sh $@ $+

dwarfton-libs.js: src/DWARFTON.js src/LIBS.js 
	@utils/build.sh $@ $+

dwarfton-cpu.js: src/DWARFTON.js src/CPU.js 
	@utils/build.sh $@ $+

d.js: dwarfton.js
	@utils/sed-minify/minifyjs $+ > $@
	
d-basic.js: dwarfton-basic.js
	@utils/sed-minify/minifyjs $+ > $@
	
d-libs.js: dwarfton-libs.js
	@utils/sed-minify/minifyjs $+ > $@
	
d-cpu.js: dwarfton-cpu.js
	@utils/sed-minify/minifyjs $+ > $@
	
submodules:
	@git submodule update --init --recursive

clean:
	@rm -f *.js
