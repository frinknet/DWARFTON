#/bin/sh

git submodule update --init --recursive

[ -f COPYRIGHT ] && echo "/*©$(cat COPYRIGHT)*/"

utils/sed-minify/minifyjs dwarfton.js > d.js
