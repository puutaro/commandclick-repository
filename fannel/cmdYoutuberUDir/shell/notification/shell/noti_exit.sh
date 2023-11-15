#!/bin/bash

e=""
readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_1"
readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly NOTI_SHELL_DIR_PATH="$(get_rvar "${REPLACE_VARS_CON}" cmdTubePlayerShellNotiShellDirPath)"
readonly NOTI_ORDINALY_UPDATE_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/ordinaly_update_title_msg.sh"
readonly FANNEL_NAME_PATH=$(\
	get_rvar "${REPLACE_VARS_CON}" cmdTubePlayerDirPath \
	| sed 's/Dir$//'\
)

pkill mpv

noti \
	-t exit \
	-cn "${1}"


kill_ptree \
	"${NOTI_ORDINALY_UPDATE_SHELL_PATH}" \
	>/dev/null  2>&1

