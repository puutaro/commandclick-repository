#!/bin/bash


readonly CURRENT_DIR_PATH=$(dirname $0)
readonly NOTI_LAUNCH_SHELL_PATH="${CURRENT_DIR_PATH}/noti_update_title_msg.sh"
readonly NOTIFICATIN_DIR_PATH=$(cd "${CURRENT_DIR_PATH}"; cd .. ; pwd)
readonly ROOT_SHELL_PATH=$(dirname "${NOTIFICATIN_DIR_PATH}")
readonly LIBS_DIR_PATH="${ROOT_SHELL_PATH}/libs"
readonly MPV_TMP_SOCKET_PATH="$(\
	bash "${LIBS_DIR_PATH}/echo_mpv_socket_path.sh"\
)"

echo '{ "command": ["playlist-next" ] }' \
| socat - "${MPV_TMP_SOCKET_PATH}"

readonly PREV_TITLE=$(\
	echo '{ "command": ["get_property", "media-title"] }' \
	| socat - "${MPV_TMP_SOCKET_PATH}" \
	| awk '{
		gsub(/(data|[\:\{\}\x22])/, "", $0)
		sub(/\,.*/, "", $0)
		print $0
	}' \
)

bash "${NOTI_LAUNCH_SHELL_PATH}"

