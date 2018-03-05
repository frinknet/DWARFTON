#/bin/sh

[ -f COPYRIGHT ] && echo "/*©$(cat COPYRIGHT)*/"

for x in $@;do
  echo "/*$(basename $x .js)*/"
  cat "$x"
  echo
done;
