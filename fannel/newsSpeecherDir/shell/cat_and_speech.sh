#!/bin/bash

set -eu 

echo "### display news"
e=""
readonly IMPORTANCE="${1:-low}"
readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly news_speecher_dir_path="$(\
	get_rvar "${REPLACE_VARS_CON}" NEWS_SPEECHER_DIR_PATH\
)"
readonly NEWS_SPEECHER_ARGS_TSV_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" NEWS_SPEECHER_ARGS_TSV_PATH\
)"
readonly ARGS_CON="$(\
	cat "${NEWS_SPEECHER_ARGS_TSV_PATH}"
)"
readonly EACH_NUM=$(tsvar "${ARGS_CON}" EACH_NUM)
readonly TO_LANG=$(tsvar "${ARGS_CON}" TO_LANG)
readonly SPEECH_MODE=$(tsvar "${ARGS_CON}" SPEECH_MODE)
readonly ON_SPEECH=$(tsvar "${ARGS_CON}" ON_SPEECH)
readonly PICH=$(tsvar "${ARGS_CON}" PICH)
readonly PLAY_CONTENTS_TXT_PATH=$(tsvar "${ARGS_CON}" PLAY_CONTENTS_TXT_PATH)
readonly NEWS_PLAY_LIST_TSV_PATH=$(tsvar "${ARGS_CON}" NEWS_PLAY_LIST_TSV_PATH)

readonly NEWS_SPEECHER_DIR_NAME="$(basename "${news_speecher_dir_path}")"
readonly NEWS_SPEECHER_RAW_NAME="${NEWS_SPEECHER_DIR_NAME%Dir}"

readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_1"
readonly SCROLL_MANAGE_ACTION="com.puutaro.commandclick.url.monitor_manager"
readonly IS_MONITOR_SCROLL_SCHEMA="is_monitor_scroll"
readonly IS_MONITOR_UPDATE_SCHEMA="is_monitor_update"


function monitor_to_default(){
	sleep 3
	send-broadcast \
		-a "${SCROLL_MANAGE_ACTION}" \
		-e "${IS_MONITOR_SCROLL_SCHEMA}=true" \
		-e "${IS_MONITOR_UPDATE_SCHEMA}=true"
}


if [ ! -f "${PLAY_CONTENTS_TXT_PATH}" ]; then \
	echo "not found ${PLAY_CONTENTS_TXT_PATH}"
	exit 0
fi
if [ ! -f "${NEWS_PLAY_LIST_TSV_PATH}" ]; then \
	echo "not found ${NEWS_PLAY_LIST_TSV_PATH}"
	exit 0
fi

send-broadcast \
	-a "${SCROLL_MANAGE_ACTION}" \
	-e "${IS_MONITOR_SCROLL_SCHEMA}=false" \
	-e "${IS_MONITOR_UPDATE_SCHEMA}=true"

cat "${PLAY_CONTENTS_TXT_PATH}" \
| awk \
'BEGIN {
	times = 1
}
{
	fast_return_con = $0
	gsub(/[\t ]/, "", fast_return_con)
	if(!fast_return_con) next
	gsub(" ", "\t", $0)
	array_length = split( $0 , line_array, "\t" )
	summary = ""
	for(i=3; i<=array_length; i++){
		summary = summary" "line_array[i]
	}
	print times"\t"$2"\t"summary
	times++
}' > "${MONITOR_FILE_PATH}"

case "${ON_SPEECH}" in
	"OFF") 
		monitor_to_default
		exit 0
		;;
esac

tspeech \
	-t "launch" \
	-l "${NEWS_PLAY_LIST_TSV_PATH}" \
	-e "importance=${IMPORTANCE}" \
	-e "playMode=${SPEECH_MODE}" \
	-e "onRoop=on" \
	-e "onTrack=on" \
	-e "pitch=${PICH}" \
	-e "transMode=${TO_LANG}" \
	-d "${NEWS_SPEECHER_DIR_NAME}" \
	-f "${NEWS_SPEECHER_RAW_NAME}"
monitor_to_default
