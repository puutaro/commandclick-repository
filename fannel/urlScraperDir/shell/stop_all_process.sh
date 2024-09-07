#!/bin/bash


set -ue 

exec repbash "${0}" \
  -t '${NEWS_SPEECHER_ARGS_TSV_PATH}'

echo "stop speech"
tspeech \
	-t "exit"

echo "stop process"
kill_ptree \
	"${NEWS_SPEECHER_DIR_PATH}" \
2>/dev/null
noti \
	-t exit \
	-cn "${WAIT_NOTIFICATION_CHANNEL_NUM}"
echo "stop comp"