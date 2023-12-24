#!/bin/bash

set -ue 

exec repbash "${0}" \
  -t "\${FILE_MANAGE_ARGS_TSV_PATH}"
e=""

noti \
	-t exit \
	-cn "${NOTIFICATION_CHANNEL_NUM}"
pkill filebrowser || e=$?
