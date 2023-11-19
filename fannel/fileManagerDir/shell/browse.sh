#!/bin/bash

set -ue

e=""
toast -l "Launch filebrowser"
readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_1"
readonly ERROR_LOG_FILE_PATH="${MONITOR_DIR_PATH}/term_2"
readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly PORT_NUM="$(\
	get_rvar "${REPLACE_VARS_CON}" PORT_NUM\
)"
readonly URL_LAUNCH_ACTION_NAME=$(\
	get_rvar "${REPLACE_VARS_CON}" URL_LAUNCH_ACTION_NAME \
)
readonly NOTI_LAUNCH_SHELL_PATH=$(\
	get_rvar "${REPLACE_VARS_CON}" NOTI_LAUNCH_SHELL_PATH \
)
readonly PRVIOUS_ROOT_DIR_MEMO_TXT_PATH=$(\
	get_rvar "${REPLACE_VARS_CON}" PRVIOUS_ROOT_DIR_MEMO_TXT_PATH \
)
readonly NOTI_EXIT_SHELL_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" NOTI_EXIT_SHELL_PATH \
)"
readonly FILE_MANAGE_ARGS_TSV_PATH=$(\
	get_rvar "${REPLACE_VARS_CON}" FILE_MANAGE_ARGS_TSV_PATH \
)
readonly ARGS_TSV_CON="$(cat "${FILE_MANAGE_ARGS_TSV_PATH}")"
readonly IPV4_ADDRESS="$(tsvar "${ARGS_TSV_CON}" IPV4_ADDRESS)"
readonly DIR_PATH_LIST="$(tsvar "${ARGS_TSV_CON}" DIR_PATH_LIST)"
readonly URL_DIR_PATH="$(tsvar "${ARGS_TSV_CON}" URL_DIR_PATH)"
readonly DISABLE_LAUNCH_URL="$(tsvar "${ARGS_TSV_CON}" DISABLE_LAUNCH_URL)"
readonly ROOT_DIR_PATH="$(tsvar "${ARGS_TSV_CON}" ROOT_DIR_PATH)"
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