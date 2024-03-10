

echo "${FILE_NAME}" |\
${b} awk '{
  print toupper(substr($0, 1, 1)) substr($0, 2, length($0) - 1)
}'