#!/bin/bash


readonly MONITOR_FILE_PATH="${MONITOR_DIR_PATH}/term_1"
readonly CURRENT_DIR_PATH=$(dirname $0)
readonly NOTI_LAUNCH_SHELL_PATH="${CURRENT_DIR_PATH}/noti_update_title_msg.sh"
readonly NOTIFICATIN_DIR_PATH=$(cd "${CURRENT_DIR_PATH}"; cd .. ; pwd)
readonly ROOT_SHELL_PATH=$(dirname "${NOTIFICATIN_DIR_PATH}")
readonly LIBS_DIR_PATH="${ROOT_SHELL_PATH}/libs"
readonly MPV_TMP_SOCKET_PATH="$(\
	bash "${LIBS_DIR_PATH}/echo_mpv_socket_path.sh"\
)"
readonly NOTIFICATION_CAHNEL_NUM="$(\
	bash "${LIBS_DIR_PATH}/echo_channel_num.sh"\
)"
readonly SEEK_0_POSI_THRESHOLD=5
readonly CURRENT_POSI=$(\
	echo '{ "command": ["get_property", "time-pos"] }' \
	| socat - /tmp/mpv_socket \
	| awk '{
		gsub(/(data|[\:\{\}\x22])/, "", $0)
		sub(/\..*/, "", $0)
		print $0
	}' \
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
