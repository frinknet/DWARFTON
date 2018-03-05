#/bin/sh

OUT=$1
shift

line() { echo $1 >> $OUT; }
name() { basename $1 .js | tr '[a-z]' '[A-Z]' | sed 's/[^a-z]+/_/g'; }
check() { [ ! -f "$1" ] && echo "Missing $1 file." && exit; }

check COPYRIGHT
check VERSION

echo "/*©$(cat COPYRIGHT)*/" > $OUT

line '"use strict"'
line
line "const $(name $OUT)=$(cat VERSION)"

for x in $@;do
  check $x
  line "/*$(name $x)*/"
  cat "$x" >> $OUT
  line
done
