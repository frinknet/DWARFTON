#/bin/sh

OUT=$1
shift

line() { echo $1 >> $OUT; }
name() { basename $1 .js | tr '[a-z]' '[A-Z]' | sed 's/[^a-z]+/_/g'; }

[ -f COPYRIGHT ] && echo "/*©$(cat COPYRIGHT)*/" > $OUT|| echo > $OUT

line '"use strict"'
line

[ -f VERSION ] && line "const $(name $OUT)=$(cat VERSION)"

for x in $@;do
  line "/*$(name $x)*/"
  cat "$x" >> $OUT
  line
done
