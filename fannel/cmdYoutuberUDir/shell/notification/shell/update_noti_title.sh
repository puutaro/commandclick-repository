#!/bin/bash

set -e
readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_2"
readonly CURRENT_DIR_PATH=$(dirname $0)
readonly NOTI_LAUNCH_SHELL_PATH="${CURRENT_DIR_PATH}/noti_update_title_msg.sh"


while :
do
	sleep 10
	bash "${NOTI_LAUNCH_SHELL_PATH}"
done