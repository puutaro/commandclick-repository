#!/bin/bash

readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_1"
readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly NOTI_SHELL_DIR_PATH="$(get_rvar "${REPLACE_VARS_CON}" cmdTubePlayerShellNotiShellDirPath)"
readonly NOTI_EXIT_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/noti_exit.sh"
readonly NOTI_NEXT_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/next.sh"
readonly NOTI_PRV_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/prev.sh"
readonly NOTI_PAUSE_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/pause.sh"
readonly NOTI_TO_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/to.sh"
readonly NOTIFICATION_CAHNEL_NUM="$(\
	get_rvar "${REPLACE_VARS_CON}" CHANNEL_NUM \
)"
readonly MPV_TMP_SOCKET_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" MPV_SOCKET \
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
	}'  2>/dev/null 
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
		}'  2>/dev/null  \
	)
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
)

noti \
	-t launch \
	-cn ${NOTIFICATION_CAHNEL_NUM} \
	--title "${title}" \
	--message "${message}" \
>/dev/null 2>&1
