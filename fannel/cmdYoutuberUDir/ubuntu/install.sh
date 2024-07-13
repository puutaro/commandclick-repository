#!/bin/bash

set -ue

exec repbash "${0}"

e=""

install_pkg(){
  sudo apt-get install -y \
      jq \
      fzf \
      socat \
      bsdmainutils
  sudo pip3 install -U \
    yt-dlp
}
readonly MONITOR_PATH="${MONITOR_DIR_PATH}/term_1"
install_pkg &
readonly install_pid=$!

wqnoti \
	-p "${install_pid}" \
	-cn "${CHANNEL_NUM}" \
	-i "high" \
	--title "Install.." \
  --monitor-path "${MONITOR_PATH}" \
	--cancel-shell-path "${cmdYoutuberUbuntuStopAllProcessShellPath}" \
|| e=$?

echo "${INSTALL_STAMP_CON}" > "${cmdYoutuberInstallStampFilePath}"
echo "Install ok"