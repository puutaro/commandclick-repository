#!/bin/bash

set -e
readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_2"
readonly NOTI_SHELL_DIR_PATH="$(get_rvar "${0}" cmdTubePlayerShellNotiShellDirPath)"
readonly NOTI_LAUNCH_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/noti_update_title_msg.sh"


while :
do
	sleep 10
	bash "${NOTI_LAUNCH_SHELL_PATH}"
done