#!/bin/bash

readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_1"
readonly NOTI_SHELL_DIR_PATH="$(get_rvar "${0}" cmdTubePlayerShellNotiShellDirPath)"
readonly NOTI_UPDATE_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/update_noti_title.sh"
readonly LIBS_DIR_PATH="$(get_rvar "${0}" cmdTubePlayerShellLibsDirPath)"
readonly KILL_PROCESS_SHELL_PATH="${LIBS_DIR_PATH}/kill_process.sh"
. "${KILL_PROCESS_SHELL_PATH}"
readonly FANNEL_NAME_PATH=$(\
	get_rvar "${0}" cmdTubePlayerDirPath \
	| sed 's/Dir$//'\
)

. "${KILL_PROCESS_SHELL_PATH}"

pkill mpv
kill_process \
	"${NOTI_UPDATE_SHELL_PATH}" \
>> "${MONITOR_FILE_PATH}"

noti \
	-t exit \
	-cn "${1}"

sleep 1

echo \
"
intentType=broadcast,
action=com.puutaro.commandclick.ubuntu_service.background_cmd_kill,
extra=
	ubuntu_croutine_job_type=${FANNEL_NAME_PATH},
" | curl -X POST -d "$(cat)" "${INTENT_MONITOR_ADDRESS}"

