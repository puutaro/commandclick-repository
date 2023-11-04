#!/bin/bash

set -e
readonly MPV_PID="${1}"
readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_2"
readonly NOTI_SHELL_DIR_PATH="$(get_rvar "${REPLACE_VARS_CON}" cmdTubePlayerShellNotiShellDirPath)"
readonly NOTI_UPDATE_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/noti_update_title_msg.sh"
readonly NOTIFICATION_CAHNEL_NUM="$(\
	get_rvar "${REPLACE_VARS_CON}" CHANNEL_NUM \
)"
readonly WAIT_SEC=10
while kill -0 "${MPV_PID}" 2>/dev/null
do
	sleep "${WAIT_SEC}"
	bash "${NOTI_UPDATE_SHELL_PATH}"
done
noti \
	-t exit \
	-cn "${NOTIFICATION_CAHNEL_NUM}"

