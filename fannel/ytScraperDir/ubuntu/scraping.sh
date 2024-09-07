#!/bin/bash

set -ue

exec repbash "${0}" \
  --args-con "${1}"

echoWebSearchPlayList(){
  toast "search..${searchWord}"
	local searchRawListPath="${cmdYoutuberTempDirPath}/searchRawList.txt"
	bash "${cmdYoutuberYtfzfShellPath}" \
		"${searchWord}" \
	| awk -F '\t'\
	'{
		print $2"\t"$3"\t"$4
	}' | cut -f2- > "${outputTsvPath}" &
	scraping_pid=$!

  local e=""
  wqnoti \
  	-p "${scraping_pid}" \
  	-cn "${CHANNEL_NUM}" \
  	-i "high" \
  	--title "search.. ${searchWord}" \
  	--cancel-shell-path "${cmdYoutuberUbuntuStopAllProcessShellPath}" \
  	|| e=$?

  send-broadcast \
      -a "com.puutaro.commandclick.edit_frag.update_index_list"

  cat "${outputTsvPath}" \
    | cut -f 2 \
    > "${cmdYoutuberTempPlayListPath}"
  wait
  mplay \
    -t launch \
    -l "${cmdYoutuberTempPlayListPath}" \
    -e playMode="${playMode}" \
    -e onLoop=on \
    -e onTrack=on
}

echoWebSearchPlayList