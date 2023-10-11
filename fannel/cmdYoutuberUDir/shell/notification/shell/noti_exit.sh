#!/bin/bash

readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_1"
readonly CURRENT_DIR_PATH=$(dirname $0)
readonly NOTIFICATIN_DIR_PATH=$(cd "${CURRENT_DIR_PATH}"; cd .. ; pwd)
readonly NOTI_CONFIG_DIR_PATH="${NOTIFICATIN_DIR_PATH}/config"
readonly NOTI_SHELL_DIR_PATH="${NOTIFICATIN_DIR_PATH}/shell"
readonly ROOT_SHELL_PATH=$(dirname "${NOTIFICATIN_DIR_PATH}")
readonly LIBS_DIR_PATH="${ROOT_SHELL_PATH}/libs"
readonly KILL_PROCESS_SHELL_PATH="${LIBS_DIR_PATH}/kill_process.sh"
readonly NOTI_EXIT_CONFIG_PATH="${NOTI_CONFIG_DIR_PATH}/noti_exit_config.js"
readonly NOTI_UPDATE_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/update_noti_title.sh"
. "${KILL_PROCESS_SHELL_PATH}"
readonly FANNEL_NAME_PATH=$(\
	cd "${NOTIFICATIN_DIR_PATH}"; cd ../.. ; pwd \
	| sed 's/Dir$//'\
)

. "${KILL_PROCESS_SHELL_PATH}"

pkill mpv
kill_process \
	"${NOTI_UPDATE_SHELL_PATH}" \
>> "${MONITOR_FILE_PATH}"

echo \
"
intentType=notification,
notificationType=exit,
channelNum=${1},
" | curl -X POST -d "$(cat)" "${INTENT_MONITOR_ADDRESS}"
# > "${INTENT_MONITOR_PATH}" 

sleep 1

echo \
"
intentType=broadcast,
action=com.puutaro.commandclick.ubuntu_service.background_cmd_kill,
extra=
	ubuntu_croutine_job_type=${FANNEL_NAME_PATH},
" | curl -X POST -d "$(cat)" "${INTENT_MONITOR_ADDRESS}"
# > "${INTENT_MONITOR_PATH}" 

