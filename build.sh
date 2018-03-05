#/bin/sh

[ -f COPYRIGHT ] && echo "/*©$(cat COPYRIGHT)*/"

utils/sed-minify/minifyjs dwarfton.js
