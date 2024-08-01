#!/bin/bash


set -eu

exec repbash "${0}" \
  -t '${NEWS_SPEECHER_ARGS_TSV_PATH}'
e=""
readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/monitor_1"
readonly ERROR_LOG_FILE_PATH="${MONITOR_DIR_PATH}/monitor_2"

before_summary(){
	case "${ON_BEFORE_SUMMARY}" in
		"ON") ;;
		*) return;;
	esac
	bash "${NEWS_SPEECHER_CAT_AND_SPEECH_SHELL_PATH}"
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
	--title "[1/2] Summary download.." \
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
