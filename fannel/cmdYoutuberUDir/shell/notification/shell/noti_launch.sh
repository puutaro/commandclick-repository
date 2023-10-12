#!/bin/bash

readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_1"
readonly CURRENT_DIR_PATH=$(dirname $0)
readonly NOTIFICATIN_DIR_PATH=$(cd "${CURRENT_DIR_PATH}"; cd .. ; pwd)
readonly NOTI_CONFIG_DIR_PATH="${NOTIFICATIN_DIR_PATH}/config"
readonly NOTI_SHELL_DIR_PATH="${NOTIFICATIN_DIR_PATH}/shell"
readonly ROOT_SHELL_PATH=$(dirname "${NOTIFICATIN_DIR_PATH}")
readonly LIBS_DIR_PATH="${ROOT_SHELL_PATH}/libs"
readonly NOTI_LAUNCH_CONFIG_PATH="${NOTI_CONFIG_DIR_PATH}/noti_launch_config.js"
readonly NOTI_EXIT_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/noti_exit.sh"
readonly NOTI_NEXT_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/next.sh"
readonly NOTI_PRV_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/prev.sh"
readonly NOTI_PAUSE_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/pause.sh"
readonly NOTI_TO_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/to.sh"
readonly NOTIFICATION_CAHNEL_NUM="$(\
	bash "${LIBS_DIR_PATH}/echo_channel_num.sh"\
)"
readonly MPV_TMP_SOCKET_PATH="$(\
	bash "${LIBS_DIR_PATH}/echo_mpv_socket_path.sh"\
)"

get_time(){
	local property_name="${1}"
	echo '{ "command": ["get_property", "'${property_name}'"] }' \
	| socat - ${MPV_TMP_SOCKET_PATH} \
	2>/dev/null \
	| awk '{
		gsub(/(data|[\:\{\}\x22])/, "", $0)
		sub(/\..*/, "", $0)
		if($0 !~ /^[0-9]+$/) {
			print "-"
			next
		}
		print $0
	}'
}

get_noti_title(){
	local title_local=$(\
		echo '{ "command": ["get_property", "media-title"] }' \
		| socat - "${MPV_TMP_SOCKET_PATH}" \
		2>/dev/null  \
		| awk '{
			gsub(/(data|[\:\{\}\x22])/, "", $0)
			sub(/\,.*/, "", $0)
			gsub(/[^a-zA-Z0-9 _=\?\!\#\&\(\)\-]/, "", $0)
			if($0 == "") {
				print "Loading.."
				next
			}
			print $0
		}')
	case "${title_local}" in
		"") echo "Loading.."
			return
			;;
	esac
	echo "${title_local}"
}

readonly title=$(get_noti_title)

readonly time_pos=$(\
	get_time "time-pos" \
)

readonly remaining_time=$(\
	get_time "time-remaining" \
)
readonly message=$(\
	echo "${time_pos}s/${remaining_time}s" \
	| sed -r 's/([^a-zA-Z0-9])/\\\1/g'\
)

noti \
	-t launch \
	-cn ${NOTIFICATION_CAHNEL_NUM} \
	--icon-name play \
	--importance low \
	--title "${title}" \
	--message "${message}" \
	--delete "shellPath=${NOTI_EXIT_SHELL_PATH},args=${NOTIFICATION_CAHNEL_NUM}" \
	-s "type=media!compactActionsInts=1&2&4" \
	--button "label=CANCEL,shellPath=${NOTI_EXIT_SHELL_PATH},args=${NOTIFICATION_CAHNEL_NUM}" \
	--button "label=PREVIOUS,shellPath=${NOTI_PRV_SHELL_PATH}" \
	--button "label=PAUSE,shellPath=${NOTI_PAUSE_SHELL_PATH}" \
	--button "label=TO,shellPath=${NOTI_TO_SHELL_PATH}" \
	--button "label=NEXT,shellPath=${NOTI_NEXT_SHELL_PATH}" \
>/dev/null 2>&1

