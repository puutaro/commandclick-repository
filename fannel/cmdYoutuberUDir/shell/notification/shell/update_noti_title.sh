#!/bin/bash

set -e
readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_2"
readonly NOTI_SHELL_DIR_PATH="$(get_rvar "${REPLACE_VARS_CON}" cmdTubePlayerShellNotiShellDirPath)"
readonly NOTI_LAUNCH_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/noti_update_title_msg.sh"


while :
do
	sleep 10
	bash "${NOTI_LAUNCH_SHELL_PATH}"
done