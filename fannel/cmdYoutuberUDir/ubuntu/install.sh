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
install_pkg &
install_pid=$!

wqnoti \
	-p "${install_pid}" \
	-cn "${CHANNEL_NUM}" \
	-i "high" \
	--title "Install.." \
	--cancel-shell-path "${cmdYoutuberUbuntuStopAllProcessShellPath}" \
|| e=$?

echo "ok" > "${cmdYoutuberInstallStampFilePath}"