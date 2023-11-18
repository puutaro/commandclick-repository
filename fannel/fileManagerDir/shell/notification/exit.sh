#!/bin/bash

set -ue 

e=""
readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly NOTIFICATION_CHANNEL_NUM="$(\
	get_rvar "${REPLACE_VARS_CON}" NOTIFICATION_CHANNEL_NUM \
)"

noti \
	-t exit \
	-cn "${NOTIFICATION_CHANNEL_NUM}"
pkill filebrowser || e=$?
