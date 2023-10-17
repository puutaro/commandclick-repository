#!/bin/bash

e=""
readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_1"
readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly NOTI_SHELL_DIR_PATH="$(get_rvar "${REPLACE_VARS_CON}" cmdTubePlayerShellNotiShellDirPath)"
readonly NOTI_UPDATE_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/update_noti_title.sh"
readonly LIBS_DIR_PATH="$(get_rvar "${REPLACE_VARS_CON}" cmdTubePlayerShellLibsDirPath)"
readonly FANNEL_NAME_PATH=$(\
	get_rvar "${REPLACE_VARS_CON}" cmdTubePlayerDirPath \
	| sed 's/Dir$//'\
)


pkill mpv

kill_ptree \
	"${NOTI_UPDATE_SHELL_PATH}" \
>> "${MONITOR_FILE_PATH}" \
|| e=$?

noti \
	-t exit \
	-cn "${1}"

sleep 1

send-broadcast \
	-a "com.puutaro.commandclick.ubuntu_service.background_cmd_kill" \
	-e "ubuntu_croutine_job_type=${FANNEL_NAME_PATH}"
