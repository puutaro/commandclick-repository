#!/bin/bash


set -ue 

readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly WAIT_NOTIFICATION_CHANNEL_NUM=$(\
	get_rvar "${REPLACE_VARS_CON}" WAIT_NOTIFICATION_CHANNEL_NUM \
)
readonly NEWS_SPEECHER_DIR_PATH=$(\
	get_rvar "${REPLACE_VARS_CON}" NEWS_SPEECHER_DIR_PATH \
)
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