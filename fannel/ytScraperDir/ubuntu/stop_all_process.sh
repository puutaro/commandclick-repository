#!/bin/bash


set -ue

exec repbash "${0}"
#  -t '${NEWS_SPEECHER_ARGS_TSV_PATH}'


echo "stop process"
kill_ptree \
	"${cmdYoutuberDirPath}" \
2>/dev/null
noti \
	-t exit \
	-cn "${CHANNEL_NUM}"
echo "stop comp"