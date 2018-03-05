#/bin/sh

if [ -f COPYRIGHT ]; then
  echo "/*©$(cat COPYRIGHT)*/"
fi

utils/sed-minify/minifyjs dwafton.js > d.js
