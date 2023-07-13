#!/bin/bash


readonly ocrTargetPath="${1}"
readonly fannelName="${2}"
readonly notificationDirPath="$(dirname "${0}")"
readonly exitShellPath="${notificationDirPath}/exit_notification.sh"
readonly shellDirPath="$(dirname "${notificationDirPath}")"
readonly fannelDirPath="$(dirname "${shellDirPath}")"
readonly currentAppDirPath="$(dirname "${fannelDirPath}")"


am broadcast \
 -a "android.intent.action.CLOSE_SYSTEM_DIALOGS"

am start \
-n "com.puutaro.commandclick/.activity.MainActivity" \
--es current_app_dir "${currentAppDirPath}" \
--es current_script_file_name "${fannelName}" \
--es on_shortcut "on"

sleep 1

am broadcast \
 -a "com.puutaro.commandclick.url.launch" \
 --es url "file://${ocrTargetPath}"
 bash "${exitShellPath}"

