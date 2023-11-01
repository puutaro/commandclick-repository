#!/bin/bash

readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_1"
readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly NOTI_SHELL_DIR_PATH="$(get_rvar "${REPLACE_VARS_CON}" cmdTubePlayerShellNotiShellDirPath)"
readonly NOTI_LAUNCH_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/noti_update_title_msg.sh"
export MPV_TMP_SOCKET_PATH="$(\
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

readonly time_pos=$(get_time "time-pos")
test "${time_pos}" = "-" && exit 0 
if [ ${time_pos} -lt 15 ]; then
	echo '{ "command": ["seek", "0", "absolute" ] }' \
	| socat - "${MPV_TMP_SOCKET_PATH}"
	bash "${NOTI_LAUNCH_SHELL_PATH}"
	exit 0
fi

echo '{ "command": ["seek", "-10" ] }' \
| socat - "${MPV_TMP_SOCKET_PATH}"


bash "${NOTI_LAUNCH_SHELL_PATH}"
