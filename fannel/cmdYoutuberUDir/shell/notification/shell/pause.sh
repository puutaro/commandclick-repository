#!/bin/bash


readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly NOTI_SHELL_DIR_PATH="$(get_rvar "${REPLACE_VARS_CON}" cmdTubePlayerShellNotiShellDirPath)"
readonly NOTI_LAUNCH_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/noti_update_title_msg.sh"
readonly MPV_TMP_SOCKET_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" MPV_SOCKET \
)"

echo '{ "command": ["get_property", "pause"] }' \
| socat - "${MPV_TMP_SOCKET_PATH}" \
| awk '{
	gsub(/(data|[\:\{\}\x22])/, "", $0)
	sub(/,.*/, "", $0)
	if($0 == "false") print "true"
	else print "false"
}'  2>/dev/null  \
| echo '{ "command": ["set_property", "pause", '$(cat)'] }' \
| socat - "${MPV_TMP_SOCKET_PATH}"


bash "${NOTI_LAUNCH_SHELL_PATH}"