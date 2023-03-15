#/bin/sh

UTILS=$(dirname $0)
OUT=$1
shift

line() { echo $1 >> $OUT; }
name() { basename $1 .js | tr '[a-z]' '[A-Z]' | sed 's/[^a-z]+/_/g'; }

[ -f COPYRIGHT ] && echo "/*©$(cat COPYRIGHT)*/" > $OUT|| echo > $OUT

line '"use strict";'
line

[ -f VERSION ] && line "const $(name $OUT)=$(cat VERSION)"

for x in $@;do
	name=$(name $x)

	echo , >> $OUT

	[ "${#name}" -gt 1 ] && line "/* ${name} */"

	cat "$x" >> $OUT

	[ "${#name}" -gt 1 ] && line
done

true
