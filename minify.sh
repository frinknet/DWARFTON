#/bin/sh

sed -e':a' \
  -e'N' \
  -e'$!ba' \
  -e's/\s+/\s/g' \
  -e's/\n\s*/\n/g' \
  -e's/\n\/\/[^\n]*/\n/g' \
#  -e's/:\s/:/g' \
#  -e's/\r/\n/g' \
#  -e's/\n/;/g' \
#  -e's/;\+/;/g' \
#  -e's/,;/,/g' \
#  -e's/;}/}/g' \
#  -e's/{;/{/g' \
#  -e's/\s+{/{/g' \
#  -e's/\s+(/(/g' \
#  -e's/\s+=/s=(/g' \
#  -e's/=\s+/s=(/g' \
#  -e's/)\s+/)/g' \
#  -e's/else;/else /g' \
  $1
