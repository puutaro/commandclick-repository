#!/bin/bash


readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_1"
readonly NOTI_SHELL_DIR_PATH="$(get_rvar "${REPLACE_VARS_CON}" cmdTubePlayerShellNotiShellDirPath)"
readonly NOTI_LAUNCH_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/noti_update_title_msg.sh"
readonly MPV_TMP_SOCKET_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" MPV_SOCKET \
)"
readonly SEEK_0_POSI_THRESHOLD=5
readonly CURRENT_POSI=$(\
	echo '{ "command": ["get_property", "time-pos"] }' \
	| socat - /tmp/mpv_socket \
	| awk '{
		gsub(/(data|[\:\{\}\x22])/, "", $0)
		sub(/\..*/, "", $0)
		print $0
	}'  2>/dev/null \
)

if [ ${CURRENT_POSI} -gt ${SEEK_0_POSI_THRESHOLD} ]; then
	echo '{ "command": ["seek", "0", "absolute" ] }' \
	| socat - "${MPV_TMP_SOCKET_PATH}"
else 
	echo '{ "command": ["playlist-prev" ] }' \
	| socat - "${MPV_TMP_SOCKET_PATH}"
fi


bash "${NOTI_LAUNCH_SHELL_PATH}"
 >> "${MONITOR_FILE_PATH}"
