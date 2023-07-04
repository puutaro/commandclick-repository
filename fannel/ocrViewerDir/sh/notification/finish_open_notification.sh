#!/bin/bash


readonly ocrTargetPath="${1}"
readonly notificationDirPath="$(dirname "${0}")"
readonly exitShellPath="${notificationDirPath}/exit_notification.sh"

am broadcast \
 -a "com.puutaro.commandclick.url.launch" \
 --es url "file://${ocrTargetPath}"
 bash "${exitShellPath}"