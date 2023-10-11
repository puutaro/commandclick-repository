#!/bin/bash

readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_1"
readonly CURRENT_DIR_PATH=$(dirname $0)
readonly NOTI_LAUNCH_SHELL_PATH="${CURRENT_DIR_PATH}/noti_update_title_msg.sh"
# noti_launch.sh"
# noti_update_title_msg.sh"
readonly NOTIFICATIN_DIR_PATH=$(cd "${CURRENT_DIR_PATH}"; cd .. ; pwd)
readonly ROOT_SHELL_PATH=$(dirname "${NOTIFICATIN_DIR_PATH}")
readonly LIBS_DIR_PATH="${ROOT_SHELL_PATH}/libs"
export MPV_TMP_SOCKET_PATH="$(\
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

readonly remaining_time=$(get_time "time-remaining")
test "${remaining_time}" = "-" && exit 0 
test "${remaining_time}" -lt 15 && exit 0
echo '{ "command": ["seek", "10" ] }' \
| socat - "${MPV_TMP_SOCKET_PATH}"


bash "${NOTI_LAUNCH_SHELL_PATH}"
