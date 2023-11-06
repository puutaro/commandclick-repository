#!/bin/bash


set -eu

e=""
readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_1"
readonly ERROR_LOG_FILE_PATH="${MONITOR_DIR_PATH}/term_2"
readonly news_speecher_dir_path="$(\
	get_rvar "${REPLACE_VARS_CON}" NEWS_SPEECHER_DIR_PATH\
)"
readonly WAIT_NOTIFICATION_CHANNEL_NUM="$(
	get_rvar "${REPLACE_VARS_CON}" WAIT_NOTIFICATION_CHANNEL_NUM \
)"
readonly NEWS_SPEECHER_STOP_ALL_PROCESS_SHELL_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" NEWS_SPEECHER_STOP_ALL_PROCESS_SHELL_PATH \
)"
readonly NEWS_SPEECHER_RE_SUMMARIZE_CONTROLLER_SHELL_PATH=$(\
	get_rvar "${REPLACE_VARS_CON}" NEWS_SPEECHER_RE_SUMMARIZE_CONTROLLER_SHELL_PATH \
)
readonly NEWS_SPEECHER_SUMMARY_OUTPUT_PY_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" NEWS_SPEECHER_SUMMARY_OUTPUT_PY_PATH\
)"
readonly NEWS_SPEECHER_SUMMARY_OUTPUT_FOR_TRANS_TXT_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" NEWS_SPEECHER_SUMMARY_OUTPUT_FOR_TRANS_TXT_PATH\
)"
readonly NEWS_SPEECHER_SUMMARY_OUTPUT_FOR_NORMAL_TXT_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" NEWS_SPEECHER_SUMMARY_OUTPUT_FOR_NORMAL_TXT_PATH\
)"
readonly NEWS_SPEECHER_TRANS_OUTPUT_TXT_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" NEWS_SPEECHER_TRANS_OUTPUT_TXT_PATH\
)"
readonly NEWS_SPEECHER_CREATE_PLAY_LIST_SHELL_PATH=$(
	get_rvar "${REPLACE_VARS_CON}" NEWS_SPEECHER_CREATE_PLAY_LIST_SHELL_PATH \
)
readonly NEWS_SPEECHER_CREATE_SRC_TEXT_SHELL_PATH=$(
	get_rvar "${REPLACE_VARS_CON}" NEWS_SPEECHER_CREATE_SRC_TEXT_SHELL_PATH \
)
readonly NEWS_SPEECHER_CAT_AND_SPEECH_SHELL_PATH=$(
	get_rvar "${REPLACE_VARS_CON}" NEWS_SPEECHER_CAT_AND_SPEECH_SHELL_PATH \
)
readonly NEWS_SPEECHER_ARGS_TSV_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" NEWS_SPEECHER_ARGS_TSV_PATH\
)"
readonly ARGS_CON="$(\
	cat "${NEWS_SPEECHER_ARGS_TSV_PATH}"
)"
readonly EACH_NUM=$(tsvar "${ARGS_CON}" EACH_NUM)
readonly TO_LANG=$(tsvar "${ARGS_CON}" TO_LANG)
readonly ON_BEFORE_SUMMARY=$(tsvar "${ARGS_CON}" ON_BEFORE_SUMMARY)
readonly SUMMARY_LENGTH=$(tsvar "${ARGS_CON}" SUMMARY_LENGTH)
readonly MAX_CONCUR=$(tsvar "${ARGS_CON}" MAX_CONCUR)
readonly EDIT_URL_LIST_PATH=$(\
	tsvar "${ARGS_CON}" EDIT_URL_LIST_PATH \
)
readonly PLAY_LIST_TEMP_SRC_DIR_PATH=$(\
	tsvar "${ARGS_CON}" PLAY_LIST_TEMP_SRC_DIR_PATH \
)
readonly PLAY_CONTENTS_TXT_PATH=$(
	tsvar "${ARGS_CON}" PLAY_CONTENTS_TXT_PATH\
)

before_summary(){
	case "${ON_BEFORE_SUMMARY}" in
		"ON") ;;
		*) return;;
	esac
	bash "${NEWS_SPEECHER_RE_SUMMARIZE_CONTROLLER_SHELL_PATH}"
}

output_handler(){
	if [ -s "${NEWS_SPEECHER_SUMMARY_OUTPUT_FOR_TRANS_TXT_PATH}" ]; then
		transw \
			":${TO_LANG}" \
			"file://${NEWS_SPEECHER_SUMMARY_OUTPUT_FOR_TRANS_TXT_PATH}" \
		| sed 'a \  \n\n' \
		> "${NEWS_SPEECHER_TRANS_OUTPUT_TXT_PATH}"
	fi
	cat \
		"${NEWS_SPEECHER_SUMMARY_OUTPUT_FOR_NORMAL_TXT_PATH}" \
		"${NEWS_SPEECHER_TRANS_OUTPUT_TXT_PATH}" \
		> "${PLAY_CONTENTS_TXT_PATH}" \
		2>/dev/null \
	|| e=$?
}

speech_before_trans(){
	if [  ! -f "${NEWS_SPEECHER_SUMMARY_OUTPUT_FOR_NORMAL_TXT_PATH}" ];then
		return
	fi
	if [  ! -f "${NEWS_SPEECHER_SUMMARY_OUTPUT_FOR_TRANS_TXT_PATH}" ];then
		return
	fi
	cat \
		"${NEWS_SPEECHER_SUMMARY_OUTPUT_FOR_NORMAL_TXT_PATH}" \
		> "${PLAY_CONTENTS_TXT_PATH}" \
		2>/dev/null \
	|| e=$?
	bash "${NEWS_SPEECHER_CREATE_PLAY_LIST_SHELL_PATH}"
	bash "${NEWS_SPEECHER_CAT_AND_SPEECH_SHELL_PATH}"
}

before_summary

rm -rf \
	"${NEWS_SPEECHER_SUMMARY_OUTPUT_FOR_TRANS_TXT_PATH}" \
	"${NEWS_SPEECHER_SUMMARY_OUTPUT_FOR_NORMAL_TXT_PATH}" \
	"${NEWS_SPEECHER_TRANS_OUTPUT_TXT_PATH}"

old_ifs="${IFS}"
IFS=$'\n'
readonly EDIT_URL_LIST_LIST=($(\
	cat "${EDIT_URL_LIST_PATH}"\
	| cut -f 2 \
))
case "${EDIT_URL_LIST_LIST}" in
	"") toast "One more url list"
		exit 0;;
esac
IFS="${old_ifs}"

python3 \
	"${NEWS_SPEECHER_SUMMARY_OUTPUT_PY_PATH}"\
	--urls "${EDIT_URL_LIST_LIST[@]}" \
	-n "${EACH_NUM}" \
	-to "${NEWS_SPEECHER_SUMMARY_OUTPUT_FOR_TRANS_TXT_PATH}" \
	-no "${NEWS_SPEECHER_SUMMARY_OUTPUT_FOR_NORMAL_TXT_PATH}" \
	-l "${TO_LANG}" \
	--summary_length "${SUMMARY_LENGTH}" \
	--err_log_file "${ERROR_LOG_FILE_PATH}" \
	--max_concur "${MAX_CONCUR}" \
	&
get_summary_pid=$!

wqnoti \
	-p "${get_summary_pid}" \
	-cn "${WAIT_NOTIFICATION_CHANNEL_NUM}" \
	-i "high" \
	--title "[1/2] Summary downlaod.." \
	--cancel-shell-path "${NEWS_SPEECHER_STOP_ALL_PROCESS_SHELL_PATH}"

speech_before_trans

trans_pid=""
output_handler \
	true \
	&
trans_pid=$!

wqnoti \
	-p "${trans_pid}" \
	-cn "${WAIT_NOTIFICATION_CHANNEL_NUM}" \
	-i "low" \
	--title "[2/2] Summary Trans.." \
	--cancel-shell-path "${NEWS_SPEECHER_STOP_ALL_PROCESS_SHELL_PATH}"
bash "${NEWS_SPEECHER_CREATE_PLAY_LIST_SHELL_PATH}"

bash "${NEWS_SPEECHER_CAT_AND_SPEECH_SHELL_PATH}"
