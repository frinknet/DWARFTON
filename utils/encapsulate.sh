#/bin/sh

OUT=$1
shift

line() { echo $1 >> $OUT; }
name() { basename $1 .js | tr '[a-z]' '[A-Z]' | sed 's/[^a-z]+/_/g'; }

line "(function(){" 
line

for x in $@;do
  line "/*$(name $x)*/"
  grep -v "Â" $x >> $OUT
  line
done

line "})()"
