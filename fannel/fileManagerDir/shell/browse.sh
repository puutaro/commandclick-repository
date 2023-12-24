#!/bin/bash

set -ue

exec repbash "${0}" \
  -t "\${FILE_MANAGE_ARGS_TSV_PATH}"

e=""
toast -l "Launch filebrowser"
readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_1"
readonly ERROR_LOG_FILE_PATH="${MONITOR_DIR_PATH}/term_2"

case "${URL_DIR_PATH}" in
	""|"-") LAUNCH_FILE_URL="http://${IPV4_ADDRESS}:${PORT_NUM}/";;
	*) LAUNCH_FILE_URL="http://${IPV4_ADDRESS}:${PORT_NUM}/files${URL_DIR_PATH}";;
esac

function wait_fm(){
	local target_pid="${1}"
	while kill -0 "${target_pid}" 2>/dev/null
	do
		sleep 3
	done
}

launch_file_url(){
	case "${DISABLE_LAUNCH_URL}" in
		"") ;;
		*) return ;;
	esac
	sleep 3
	send-broadcast \
		-a "${URL_LAUNCH_ACTION_NAME}" \
		-e "url=${LAUNCH_FILE_URL}"
}

pkill filebrowser || e=$?
sleep 2
echo "${ROOT_DIR_PATH}" \
	> "${PRVIOUS_ROOT_DIR_MEMO_TXT_PATH}" &
filebrowser \
	--address "${IPV4_ADDRESS}" \
	--port "${PORT_NUM}" \
	--noauth \
	-r "${ROOT_DIR_PATH}" \
	>> "${ERROR_LOG_FILE_PATH}" \
	2>&1 \
	&

readonly FILEBROWSER_PID=$!

bash "${NOTI_LAUNCH_SHELL_PATH}"

launch_file_url

wait_fm \
	"${FILEBROWSER_PID}"
bash "${NOTI_EXIT_SHELL_PATH}"