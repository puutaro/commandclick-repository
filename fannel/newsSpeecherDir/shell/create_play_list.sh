#!/bin/bash


set -eu


e=""
readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly news_speecher_dir_path="$(\
	get_rvar "${REPLACE_VARS_CON}" NEWS_SPEECHER_DIR_PATH\
)"
readonly NEWS_SPEECHER_ARGS_TSV_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" NEWS_SPEECHER_ARGS_TSV_PATH\
)"
readonly NEWS_SPEECHER_CREATE_SRC_TEXT_SHELL_PATH=$(
	get_rvar "${REPLACE_VARS_CON}" NEWS_SPEECHER_CREATE_SRC_TEXT_SHELL_PATH \
)
readonly ARGS_CON="$(\
	cat "${NEWS_SPEECHER_ARGS_TSV_PATH}"
)"
readonly PLAY_CONTENTS_TXT_PATH=$(tsvar "${ARGS_CON}" PLAY_CONTENTS_TXT_PATH)
readonly PLAY_LIST_TEMP_SRC_DIR_PATH=$(\
	tsvar "${ARGS_CON}" PLAY_LIST_TEMP_SRC_DIR_PATH \
)
readonly NEWS_PLAY_LIST_TSV_PATH=$(
	tsvar "${ARGS_CON}" NEWS_PLAY_LIST_TSV_PATH \
)

rm -rf "${PLAY_LIST_TEMP_SRC_DIR_PATH}"
mkdir -p "${PLAY_LIST_TEMP_SRC_DIR_PATH}"

cat "${PLAY_CONTENTS_TXT_PATH}" \
| awk \
	-v PLAY_LIST_TEMP_SRC_DIR_PATH="${PLAY_LIST_TEMP_SRC_DIR_PATH}" \
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
	con = times",\t"summary
	gsub("\x27", "`", con)
	if(!con) next
	print "echo \x27"con"\x27 > " PLAY_LIST_TEMP_SRC_DIR_PATH"/"times".txt &"
	times++
}
END {
	print "wait"
}' > "${NEWS_SPEECHER_CREATE_SRC_TEXT_SHELL_PATH}"
bash "${NEWS_SPEECHER_CREATE_SRC_TEXT_SHELL_PATH}"
find "${PLAY_LIST_TEMP_SRC_DIR_PATH}/"* \
	> "${NEWS_PLAY_LIST_TSV_PATH}"