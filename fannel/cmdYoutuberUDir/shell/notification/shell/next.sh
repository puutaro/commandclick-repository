#!/bin/bash


readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly NOTI_SHELL_DIR_PATH="$(get_rvar "${REPLACE_VARS_CON}" cmdTubePlayerShellNotiShellDirPath)"
readonly NOTI_LAUNCH_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/noti_update_title_msg.sh"
readonly MPV_TMP_SOCKET_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" MPV_SOCKET \
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
	}'  2>/dev/null  \
)

bash "${NOTI_LAUNCH_SHELL_PATH}"

