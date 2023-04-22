#!/bin/bash

set -eu


PARENT_DIR_PATH="$(dirname "$0")"
YTFZF_SHELL_PATH="${PARENT_DIR_PATH}/ytfzfForFannel.sh"
PLAY_PROCESS_DIR_PATH="${PARENT_DIR_PATH}/process"
APP_DIR_PATH="$(dirname "${PARENT_DIR_PATH}")"
PLAY_LOG_DIR_PATH="${APP_DIR_PATH}/log"
PLAY_LOG_FILE_PATH="${PLAY_LOG_DIR_PATH}/playLog"
TMP_PLAY_LIST_NAME="tmp_play_list"
TMP_PLAY_LIST_PATH="${PLAY_PROCESS_DIR_PATH}/${TMP_PLAY_LIST_NAME}"
SHUFFLE_MODE="shuffle"
ORDINALY_MODE="ordinaly"
REVERSE_MODE="reverse"
NUMBER_MODE="number"
WEB_SEARCH_RECENT_MODE="RECENT"
WEB_SEARCH_SHORT_MODE="SHORT"
WEB_SEARCH_OFF_MODE="OFF"
EDIT_SITE_WEB_MODE="edit_site_web"
URL_LAUNCH_ACTION_NAME="com.puutaro.commandclick.url.launch"


readonly INSTALL_MODE="install"

package_installer(){
	local package_name="${1}"
	local exist_package=$(\
		pkg list-installed \
			| grep "${package_name}" \
	)
	case "${exist_package}" in
		"") ;;
		*) 
			echo "already pkg installed: ${exist_package}"
			return ;;
	esac
	pkg install -y "${package_name}"
}


pip_package_installer(){
	local package_name="${1:-}"
	local version="${2:-}"
	local exist_package=$(\
		pip list \
			| grep "${package_name}" \
			| grep "${version}"
	)
	case "${exist_package}" in
		"") ;;
		*) 
			echo "already pip installed: ${exist_package}"
			return ;;
	esac
	pip uninstall -y "${package_name}"
	pip install "${package_name}==${version}"
}


termux_mpv_package_installer(){
	local exist_package=$(\
		pip list \
			| grep "Termux-Mpv" \
	)
	case "${exist_package}" in
		"") ;;
		*) 
			echo "already pkg installed: ${exist_package}"
			return ;;
	esac
	pip install "git+https://github.com/Neo-Oli/Termux-Mpv"
}


cut_play_url_history_limit_over(){
	local history_limit_num=1000
	if [ ! -f "${PLAY_LOG_FILE_PATH}" ];then
		touch "${PLAY_LOG_FILE_PATH}"
		return
	fi
	local grep_prefix="Playing:"
	local play_url_history_con="$(\
		cat "${PLAY_LOG_FILE_PATH}" \
		| grep -E \
			-e "${grep_prefix}" \
			-e  "^## [0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}"\
		| sed '/^$/d' \
		| tail -"${history_limit_num}" \
	)"
	local datetime="$(date '+%Y-%m-%d %H:%M:%S')"
	local log_contents=$(
		cat \
			<(echo "${play_url_history_con}")\
			<(echo "## ${datetime}")\
	)
	sleep 0.1
	echo \
		"${log_contents}" \
		| sed '/^$/d' \
		> "${PLAY_LOG_FILE_PATH}" 
}

play_temp_list(){
	local play_mode="${1:-}"
	cut_play_url_history_limit_over
	sleep 0.1
	termuxmpv \
		--no-video \
		"${play_mode}"  \
		--loop-playlist=inf \
		--playlist="${TMP_PLAY_LIST_PATH}" \
	 | tee -a "${PLAY_LOG_FILE_PATH}"
}


number_playing(){
	local tubePlayListPath="${1}"
	local number="${2}"
	if [[ ! ${number} =~ ^[0-9]+(\.[0-9]+)?$ ]] then
		return 
	fi
	local playUrl=$(\
		cat "${tubePlayListPath}" \
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
	play_temp_list
	exit 0
}

updateWebSearchPlayList(){
	local webSearchArgs="${1}"
	local onWebSearch="$(echo "${webSearchArgs}" | cut -f1)"
	local searchWord="$(echo "${webSearchArgs}" | cut -f2)"
	local enableUpdateWebSearchList="$(echo "${webSearchArgs}" | cut -f3)"
	case "${enableUpdateWebSearchList}" in
		"true") ;;
		*) return;;
	esac
	echoWebSearchPlayList \
		"${webSearchArgs}" \
		> "${tubePlayListPath}"
	wait
}

echoWebSearchPlayList(){
	local webSearchArgs="${1}"
	local onWebSearch="$(echo "${webSearchArgs}" | cut -f1)"
	local searchWord="$(echo "${webSearchArgs}" | cut -f2)"
	termux-toast \
		-g "bottom" "editing.."
	local searchRawList=$(\
		bash "${YTFZF_SHELL_PATH}" \
			"${searchWord}" \
	)
	case "${onWebSearch}" in
		"${WEB_SEARCH_SHORT_MODE}") 
			echo "${searchRawList}" \
				| cut -f2-
			;;
		"${WEB_SEARCH_RECENT_MODE}")
			echo "${searchRawList}" \
				| sort -n  \
				| cut -f2-
			;;
	esac	
}

launch_edit_site(){
	local tubePlayListPath="${1}"
	am broadcast \
		-a "com.puutaro.commandclick.html.launch" \
		--es edit_path "${tubePlayListPath}" \
		--es src_path "" \
		--es on_click_sort "false" \
		--es on_sortable_js "true" \
		--es on_click_url "true" \
		--es filter_code "true"  \
		> /dev/null 2>&1
}


play_mode_handler(){
	local play_mode="${1}"
	local tubePlayListPath="${2}"
	local webSearchArgs="${3:-}"
	local playNumber="${4:-}"
	local onWebSearch=$(echo "${webSearchArgs}" | cut -f1)
	local searchWord=$(echo "${webSearchArgs}" | cut -f2)
	if [ ! -d "${PLAY_PROCESS_DIR_PATH}" ]; then
		mkdir -p "${PLAY_PROCESS_DIR_PATH}";
	fi
	echo --
	if [ ! -f "${PLAY_LOG_FILE_PATH}" ];then
		touch "${PLAY_LOG_FILE_PATH}"
	fi
	echo 0011
	echo "play_mode: ${play_mode}"
	echo "playListPath: ${tubePlayListPath}"
	echo "playNumber: ${playNumber}"
	local displayWebSearchArgs=$(\
		echo "${webSearchArgs}" \
		 | sed 's/\t/, /g'\
	)
	echo "webSearchArgs: ${displayWebSearchArgs}"
	case "${play_mode}" in
		"${SHUFFLE_MODE}")
			updateWebSearchPlayList \
				"${webSearchArgs}"
			cat "${tubePlayListPath}" \
				| cut -f 2 > "${TMP_PLAY_LIST_PATH}"
			wait
			play_temp_list \
				"--shuffle"
			exit 0
			;;
		"${ORDINALY_MODE}")
			updateWebSearchPlayList \
				"${webSearchArgs}"
			cat "${tubePlayListPath}" \
				| cut -f 2 > "${TMP_PLAY_LIST_PATH}"
			wait
			play_temp_list
			exit 0
			;;
		"${REVERSE_MODE}")
			updateWebSearchPlayList \
				"${webSearchArgs}"
			cat "${tubePlayListPath}" \
				| cut -f 2 \
				| tac > "${TMP_PLAY_LIST_PATH}"
			wait
			play_temp_list
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
		"${INSTALL_MODE}")
			package_installer "mpv"
			package_installer "git"
			package_installer "termux-api"
			package_installer "python"
			pip_package_installer "yt-dlp" "2023.2.17"
			termux_mpv_package_installer
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
