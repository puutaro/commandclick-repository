#!/bin/bash

readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_1"

readonly is_filebrowser=$(\
	ps aux \
	| awk '{
		if($0 ~ "awk ") next
		if($0 !~ "filebrowser --address") next
		print $0
	}'\
)
case "${is_filebrowser}" in
	"") exit 0;;
esac
readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly NOTIFICATION_CHANNEL_NUM="$(\
	get_rvar "${REPLACE_VARS_CON}" NOTIFICATION_CHANNEL_NUM \
)"
readonly NOTI_EXIT_SHELL_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" NOTI_EXIT_SHELL_PATH \
)"
readonly PORT_NUM="$(\
	get_rvar "${REPLACE_VARS_CON}" PORT_NUM \
)"
readonly FILE_MANAGE_ARGS_TSV_PATH=$(\
	get_rvar "${REPLACE_VARS_CON}" FILE_MANAGE_ARGS_TSV_PATH \
)
readonly ARGS_TSV_CON="$(cat "${FILE_MANAGE_ARGS_TSV_PATH}")"
readonly IPV4_ADDRESS="$(tsvar "${ARGS_TSV_CON}" IPV4_ADDRESS)"
readonly ROOT_DIR_PATH="$(tsvar "${ARGS_TSV_CON}" ROOT_DIR_PATH)"
readonly LAUNCH_FILE_URL="http://${IPV4_ADDRESS}:${PORT_NUM}/"

noti \
	-t launch \
	-cn ${NOTIFICATION_CHANNEL_NUM} \
	--icon-name folda \
	--importance high \
	--title "FM ${LAUNCH_FILE_URL}" \
	--message "${LAUNCH_FILE_URL} ( ${ROOT_DIR_PATH}" \
	--alert-once \
	--delete "shellPath=${NOTI_EXIT_SHELL_PATH},args=${NOTIFICATION_CHANNEL_NUM}" \
	--button "label=CLOSE,shellPath=${NOTI_EXIT_SHELL_PATH}" \
>/dev/null 2>&1

