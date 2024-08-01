#!/bin/bash


exec repbash "${0}" \
  -t "\${FILE_MANAGE_ARGS_TSV_PATH}"

readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/monitor_1"

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

