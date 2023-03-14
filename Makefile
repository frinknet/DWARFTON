DWARFTON=\
	src/D.js \
	src/W.js \
	src/A.js \
	src/R.js \
	src/F.js \
	src/T.js \
	src/O.js \
	src/N.js 
QUICK=\
	src/Q.js \
	src/U.js \
	src/I.js \
	src/C.js \
	src/K.js \
PLY=\
	src/P.js \
	src/L.js \
	src/Y.js \
BG=\
	src/B.js \
	src/G.js \
MESH=\
	src/M.js \
	src/E.js \
	src/S.js \
	src/H.js

.PHONY: all
all: clean submodules dist

.PHONY: dist
dist: d.js
	@mv -f *.js dist/

.PHONY: submodules
submodules:
	@git submodule update --init --recursive

.PHONY: clean
clean:
	@rm -f *.js dist/*

dwarfton.js: $(DWARFTON) 
	@utils/build.sh $@ $+

d.js: dwarfton.js
	@utils/sed-minify/minifyjs $+ > $@
	
src/%:
	@touch $@
