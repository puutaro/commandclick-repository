#!/bin/bash

set -eu

e=""
readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly ROOT_SHELL_DIR_PATH="$(get_rvar "${REPLACE_VARS_CON}" cmdTubePlayerShellDirPath)"
readonly YTFZF_SHELL_PATH="${ROOT_SHELL_DIR_PATH}/ytfzfForFannel.sh"
readonly NOTI_SHELL_TMP_DIR_PATH="${ROOT_SHELL_DIR_PATH}/temp"
readonly PLAY_PROCESS_DIR_PATH="${ROOT_SHELL_DIR_PATH}/process"
readonly FANNEL_DIR_PATH="$(get_rvar "${REPLACE_VARS_CON}" cmdTubePlayerDirPath)"
readonly INSTALL_EVIDENCE_FILE_PATH="$(get_rvar "${REPLACE_VARS_CON}" cmdTubePlayerInstallCompFilePath)"
readonly NOTI_SHELL_DIR_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" cmdTubePlayerShellNotiShellDirPath\
)"
readonly NOTI_LAUNCH_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/noti_launch.sh"
readonly NOTI_ORDINALY_UPDATE_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/ordinaly_update_title_msg.sh"
readonly NOTI_EXIT_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/noti_exit.sh"
readonly TMP_PLAY_LIST_NAME="tmp_play_list"
readonly TMP_PLAY_LIST_PATH="${PLAY_PROCESS_DIR_PATH}/${TMP_PLAY_LIST_NAME}"
readonly SHUFFLE_MODE="shuffle"
readonly ORDINALY_MODE="ordinaly"
readonly REVERSE_MODE="reverse"
readonly NUMBER_MODE="number"
readonly STOP_MODE="stop"
readonly INSTALL_MODE="install"
readonly WEB_SEARCH_RECENT_MODE="RECENT"
readonly WEB_SEARCH_SHORT_MODE="SHORT"
readonly WEB_SEARCH_OFF_MODE="OFF"
readonly EDIT_SITE_WEB_MODE="edit_site_web"
readonly URL_LAUNCH_ACTION_NAME="com.puutaro.commandclick.url.launch"
readonly NO_WEB_SEARCH_MODE_CONTENTS="OFF"
readonly CONST_MAX_MINITS=100000
readonly NOTIFICATION_CAHNEL_NUM="$(\
	get_rvar "${REPLACE_VARS_CON}" CHANNEL_NUM \
)"

readonly MPV_TMP_SOCKET_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" MPV_SOCKET \
)"

install_package_wrapper(){
	rm -rf "${INSTALL_EVIDENCE_FILE_PATH}"
	sudo apt-get install -y \
		jq \
		fzf \
		mpv \
		socat \
		bsdmainutils \
	&& pip3 install -U yt-dlp \
	&& touch "${INSTALL_EVIDENCE_FILE_PATH}" \
	&& echo "complete installation" \
	|| echo "Retry install"
}

save_play_log_history_to_tsv(){
	local play_log_file_path="${1}"
	cat "${play_log_file_path}" \
	| awk '
	BEGIN {
		datetimePrefix = "## "
		datetimeColumen = ""
		httpRegex = "^Playing:"
		print "datetime\tyoutube url"
	}
	{
		if(\
			$0 ~ "^"datetimePrefix\
		) datetimeColumen = $0
		if($0 !~ httpRegex) next
		if(!datetimeColumen) next
		sub(httpRegex, "", $0)
		sub("^  *", "", $0)
		if(!$0) next
		print datetimeColumen"\t"$0
	}' > "${play_log_file_path}.tsv"
}


stop_mpv_process(){
	local full="${1:-}"
	pkill -9 mpv || e=$?
	case "${full}" in
		"") return ;;
	esac
	bash "${NOTI_EXIT_SHELL_PATH}" \
		"${NOTIFICATION_CAHNEL_NUM}"
}

judge_stop_by_play_mode(){
	local play_mode="${1:-}"
	case "${play_mode}" in
		"${STOP_MODE}") 
			;;
		*) return
			;;
	esac
	stop_mpv_process "full"
	exit 0
}


launch_notification(){
	local mpv_pid="${1}"
	bash "${NOTI_LAUNCH_SHELL_PATH}"
	bash "${NOTI_ORDINALY_UPDATE_SHELL_PATH}" \
		"${mpv_pid}"
}


play_temp_list(){
	local play_mode="${1:-}"
	stop_mpv_process "full"
	rm -rf "${MPV_TMP_SOCKET_PATH}"
	mpv \
		--input-ipc-server="${MPV_TMP_SOCKET_PATH}" \
		--no-video \
		"${play_mode}"  \
		--loop-playlist=inf \
		--playlist="${TMP_PLAY_LIST_PATH}" \
		--no-osc \
	 2>/dev/null \
	 &
	 local mpv_pid=$!
	 launch_notification \
	 	"${mpv_pid}"
}

echo_temp_play_list(){
	tubePlayListPath="${1}"
	cat "${tubePlayListPath}" \
		| cut -f 2 \
		| awk '
			{
				if($0 !~ "&list="){
					print $0
					next
				}
				sub(/watch\?v=[^&]*/, "playlist", $0); 
				print $0
			}'
}


number_playing(){
	local tubePlayListPath="${1}"
	local number="${2}"
	expr "$number" : "[0-9]*$" >&/dev/null || return
	local playUrl=$(\
		echo_temp_play_list \
			"${tubePlayListPath}" \
		| sed \
			-n ''${number}'p' \
		| cut -f 2 \
	)
	awk \
		-v playUrl="${playUrl}" \
		'BEGIN {
			for(i=0; i < 50; i++){
				print playUrl
			}
		}' > "${TMP_PLAY_LIST_PATH}"
	play_temp_list ""
	exit 0
}

updateWebSearchPlayList(){
	local webSearchArgs="${1}"
	local onWebSearchMode="$(echo "${webSearchArgs}" | cut -f1)"
	local searchWord="$(echo "${webSearchArgs}" | cut -f2)"
	local enableUpdateWebSearchList="$(echo "${webSearchArgs}" | cut -f3)"
	case "${enableUpdateWebSearchList}" in
		"true") ;;
		*) return;;
	esac
	case "${onWebSearchMode}" in
		"ON") ;;
		*) return;;
	esac
	echoWebSearchPlayList \
		"${webSearchArgs}"  \
		> "${tubePlayListPath}"
	wait
}

echoWebSearchPlayList(){
	local webSearchArgs="${1}"
	local onWebSearchMode="$(echo "${webSearchArgs}" | cut -f1)"
	local searchWord="$(echo "${webSearchArgs}" | cut -f2)"
	local searchRawListPath="${NOTI_SHELL_TMP_DIR_PATH}/searchRawList.txt"
	mkdir -p "${NOTI_SHELL_TMP_DIR_PATH}"
	bash "${YTFZF_SHELL_PATH}" \
		"${searchWord}" \
	| awk -F '\t'\
		-v CONST_MAX_MINITS="${CONST_MAX_MINITS}" \
	'{
		print $2"\t"$3"\t"$4
	}' > "${searchRawListPath}" &
	local yt_download_pid=$!
	wmsg \
		"${yt_download_pid}" \
		"web search"
	cat "${searchRawListPath}" \
		| sort -n  \
		| cut -f2-
}

launch_edit_site(){
	local tubePlayListPath="${1}"
	send-broadcast \
		-a "com.puutaro.commandclick.html.launch" \
		-e "edit_path=${tubePlayListPath}" \
		-e "src_path=" \
		-e "on_click_sort=false" \
		-e "on_sortable_js=true" \
		-e "on_click_url=true" \
		-e "filter_code=true" \
		>/dev/null 2>&1
}


play_mode_handler(){
	local play_mode="${1}"
	local tubePlayListPath="${2:-}"
	local webSearchArgs="${3:-}"
	webSearchArgs="${webSearchArgs//!/$'\t'}"
	local playNumber="${4:-}"
	case "${play_mode}" in
		"${INSTALL_MODE}")
			install_package_wrapper
			exit 0
			;;
	esac
	judge_stop_by_play_mode \
		"${play_mode}"
	if [ ! -d "${PLAY_PROCESS_DIR_PATH}" ]; then
		mkdir -p "${PLAY_PROCESS_DIR_PATH}";
	fi
	local displayWebSearchArgs=$(\
		echo "${webSearchArgs}" \
		| awk \
			-F '\t' \
			-v NO_WEB_SEARCH_MODE_CONTENTS="${NO_WEB_SEARCH_MODE_CONTENTS}" \
			-v CONST_MAX_MINITS="${CONST_MAX_MINITS}" \
		'{
			if(\
				index(NO_WEB_SEARCH_MODE_CONTENTS, $1) > 0\
			) {
				print ""
				next
			}
			print ""
			print " searchWord: "$2
			print " searchListUpdate: "$3
		}' \
	)
	echo "play_mode: ${play_mode}"
	echo "playListPath: ${tubePlayListPath}"
	echo "playNumber: ${playNumber}"
	echo "webSearchArgs: ${displayWebSearchArgs}"
	case "${play_mode}" in
		"${SHUFFLE_MODE}")
			updateWebSearchPlayList \
				"${webSearchArgs}"
			echo_temp_play_list \
				"${tubePlayListPath}" \
				 > "${TMP_PLAY_LIST_PATH}"
			wait
			play_temp_list "--shuffle"
			exit 0
			;;
		"${ORDINALY_MODE}")			
			updateWebSearchPlayList \
				"${webSearchArgs}"
			echo_temp_play_list \
				"${tubePlayListPath}" \
				 > "${TMP_PLAY_LIST_PATH}"
			wait
			play_temp_list ""				
			exit 0
			;;
		"${REVERSE_MODE}")
			updateWebSearchPlayList \
				"${webSearchArgs}"
			echo_temp_play_list \
				"${tubePlayListPath}" \
				| tac > "${TMP_PLAY_LIST_PATH}"
			wait
			play_temp_list ""
			exit 0
			;;
		"${NUMBER_MODE}")
			updateWebSearchPlayList \
				"${webSearchArgs}"
			number_playing \
				"${tubePlayListPath}" \
				"${playNumber}"
			exit 0
			;;
		"${EDIT_SITE_WEB_MODE}")
			updateWebSearchPlayList \
				"${webSearchArgs}"
			launch_edit_site \
				"${tubePlayListPath}" \
				"${webSearchArgs}"
			exit 0
			;;
	esac
}


play_mode_handler \
	"${1:-}" "${2:-}" "${3:-}" "${4:-}" 
