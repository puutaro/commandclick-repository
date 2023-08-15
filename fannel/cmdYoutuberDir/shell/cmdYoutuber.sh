#!/bin/bash

set -eu


PARENT_DIR_PATH="$(dirname "$0")"
YTFZF_SHELL_PATH="${PARENT_DIR_PATH}/ytfzfForFannel.sh"
PLAY_PROCESS_DIR_PATH="${PARENT_DIR_PATH}/process"
APP_DIR_PATH="$(dirname "${PARENT_DIR_PATH}")"
TMP_PLAY_LIST_NAME="tmp_play_list"
TMP_PLAY_LIST_PATH="${PLAY_PROCESS_DIR_PATH}/${TMP_PLAY_LIST_NAME}"
SHUFFLE_MODE="shuffle"
ORDINALY_MODE="ordinaly"
REVERSE_MODE="reverse"
NUMBER_MODE="number"
STOP_MODE="stop"
WEB_SEARCH_RECENT_MODE="RECENT"
WEB_SEARCH_SHORT_MODE="SHORT"
WEB_SEARCH_OFF_MODE="OFF"
EDIT_SITE_WEB_MODE="edit_site_web"
URL_LAUNCH_ACTION_NAME="com.puutaro.commandclick.url.launch"
NO_WEB_SEARCH_MODE_CONTENTS="LOG_RND|LOG_FREQ|OFF"
readonly CONST_MAX_MINITS=100000


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


pip_package_upgrade_handler(){
	local package_name="${1:-}"
	local version="${2:-}"
	case "${version}" in
		"") 
			;;
		*) 
			echo "already pip installed: ${package_name}"
			return
			;;
	esac
	pip install --upgrade "${package_name}"
}


pip_package_installer(){
	local package_name="${1:-}"
	local version="${2:-}"
	local exist_package=$(\
		pip list \
			| grep "${package_name}" \
			| grep "${version}" \
	)
	case "${exist_package}" in
		"") ;;
		*) 
			pip_package_upgrade_handler \
				"${package_name}" \
				"${version}"
			return 
			;;
	esac
	case "${version}" in
		"") 
			local install_package_name="${package_name}"
			;;
		*) 
			local install_package_name="${package_name}==${version}"
			;;
	esac
	pip uninstall -y "${package_name}"
	pip install "${install_package_name}"
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


install_package_wrapper(){
	package_installer "jq"
	package_installer "fzf"
	package_installer "mpv"
	package_installer "git"
	package_installer "termux-api"
	package_installer "python"
	pip_package_installer "yt-dlp"
	termux_mpv_package_installer
	echo "complete installation"
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


cut_play_url_history_limit_over(){
	local play_log_file_path="${1}"
	local history_limit_num=300
	if [ ! -f "${play_log_file_path}" ];then
		touch "${play_log_file_path}"
		return
	fi
	local grep_prefix="Playing:"
	local play_url_history_con="$(\
		cat "${play_log_file_path}" \
		| awk \
			-v grep_prefix="${grep_prefix}" \
		'{
			sub(/^  */, "", $0)
			sub(/  *$/, "", $0)
			if($0 == "") next
			if(\
				index($0, grep_prefix) > 0 \
				&& index($0, "http") > 0 \
			) {
				print $0
				next
			}
			if(\
				$0 ~ /^## [0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/ \
			) {
				print $0
				next
			}
		}' \
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
		> "${play_log_file_path}" 
	wait
	save_play_log_history_to_tsv \
		"${play_log_file_path}"
}

stop_termux_mpv(){
	pkill -9 mpv || e=$?
	local notiTag=$(\
		termux-notification-list \
		| awk '{
				if(\
					$0 !~ "tag" || $0 !~ "termuxMpv"\
				) next
				gsub("\x22", "", $0)
				sub(" tag:", "", $0)
				gsub(",", "", $0)
				sub("^  *", "", $0)
				print $0
			}'\
		)

	case "${notiTag}" in
		"") return
		;;
	esac
	termux-notification-remove "${notiTag}"
}

judge_stop_by_play_mode(){
	local play_mode="${1:-}"
	case "${play_mode}" in
		"${STOP_MODE}") 
			;;
		*) return
			;;
	esac
	stop_termux_mpv
	exit 0
}

play_temp_list(){
	local play_mode="${1:-}"
	local play_log_file_path="${2}"
	local no_log_cat="${3:-}"
	cut_play_url_history_limit_over \
		"${play_log_file_path}"
	stop_termux_mpv
	sleep 0.5
	case "${no_log_cat}" in
		"")
			termuxmpv \
				--no-video \
				"${play_mode}"  \
				--loop-playlist=inf \
				--playlist="${TMP_PLAY_LIST_PATH}" \
			 | tee -a "${play_log_file_path}"
			 return
			 ;;
	esac
	termuxmpv \
		--no-video \
		"${play_mode}"  \
		--loop-playlist=inf \
		--playlist="${TMP_PLAY_LIST_PATH}" \
	 >/dev/null 2>&1
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
	local play_log_file_path="${3}"
	if [[ ! ${number} =~ ^[0-9]+(\.[0-9]+)?$ ]] then
		return 
	fi
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
	play_temp_list \
		"" \
		"${play_log_file_path}"
	exit 0
}

updateWebSearchPlayList(){
	local webSearchArgs="${1}"
	local onSearchMode="$(echo "${webSearchArgs}" | cut -f1)"
	local searchWord="$(echo "${webSearchArgs}" | cut -f2)"
	local enableUpdateWebSearchList="$(echo "${webSearchArgs}" | cut -f3)"
	case "${enableUpdateWebSearchList}" in
		"true") ;;
		*) return;;
	esac
	case "$(\
			echo "${NO_WEB_SEARCH_MODE_CONTENTS}" \
			| grep "${onSearchMode}"\
		)" in
		"") ;;
		*) return;;
	esac
	echoWebSearchPlayList \
		"${webSearchArgs}"  \
		> "${tubePlayListPath}"
	wait
}

echoWebSearchPlayList(){
	local webSearchArgs="${1}"
	local onSearchMode="$(echo "${webSearchArgs}" | cut -f1)"
	local searchWord="$(echo "${webSearchArgs}" | cut -f2)"
	local movieTimeList="$(echo "${webSearchArgs}" | cut -f4)"
	local minMinutes="$(echo "${movieTimeList}" | cut -d ',' -f1)"
	local maxMinutes="$(echo "${movieTimeList}" | cut -d ',' -f2)"

	termux-toast \
		-g "bottom" "editing.."
	local searchRawList=$(\
		bash "${YTFZF_SHELL_PATH}" \
			"${searchWord}" \
			| awk -F '\t'\
			-v minMinutes="${minMinutes}" \
			-v maxMinutes="${maxMinutes}" \
			-v CONST_MAX_MINITS="${CONST_MAX_MINITS}" \
		'BEGIN {
			minMinutes = minMinutes * 100
			maxMinutes = maxMinutes * 100
			if(maxMinutes == 0) maxMinutes = CONST_MAX_MINITS
		}
		{
			timeSpan = $1
			if(\
				timeSpan < minMinutes \
				|| timeSpan > maxMinutes \
			) next
			print $2"\t"$3"\t"$4
		}' \
	)
	case "${onSearchMode}" in
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
	local tubePlayListPath="${2:-}"
	local webSearchArgs="${3:-}"
	local playNumber="${4:-}"
	local no_log_cat="${5:-}"
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
	local play_log_file_path="$(\
		echo "${webSearchArgs}" \
		| cut -f5\
	)"
	if [ ! -f "${play_log_file_path}" ];then
		touch "${play_log_file_path}"
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
			split($4, minutesSpanList, ",")
			print ""
			print " searchWord: "$2
			print " searchListUpdate: "$3
			print " minMinutes: "minutesSpanList[1]
			maxMinutes = minutesSpanList[2]
			if(maxMinutes == 0) maxMinutes = CONST_MAX_MINITS
			print " maxMinutes: "maxMinutes
		}' \
	)
	case "${no_log_cat}" in
		"")
			echo "play_mode: ${play_mode}"
			echo "playListPath: ${tubePlayListPath}"
			echo "playNumber: ${playNumber}"
			echo "webSearchArgs: ${displayWebSearchArgs}"
			;;
	esac
	case "${play_mode}" in
		"${SHUFFLE_MODE}")
			updateWebSearchPlayList \
				"${webSearchArgs}"
			echo_temp_play_list \
				"${tubePlayListPath}" \
				 > "${TMP_PLAY_LIST_PATH}"
			wait
			play_temp_list \
				"--shuffle" \
				"${play_log_file_path}"
			exit 0
			;;
		"${ORDINALY_MODE}")
			updateWebSearchPlayList \
				"${webSearchArgs}"
			echo_temp_play_list \
				"${tubePlayListPath}" \
				 > "${TMP_PLAY_LIST_PATH}"
			wait
			play_temp_list \
				"" \
				"${play_log_file_path}" \
				"${no_log_cat}"
			exit 0
			;;
		"${REVERSE_MODE}")
			updateWebSearchPlayList \
				"${webSearchArgs}"
			echo_temp_play_list \
				"${tubePlayListPath}" \
				| tac > "${TMP_PLAY_LIST_PATH}"
			wait
			play_temp_list \
				"" \
				"${play_log_file_path}"
			exit 0
			;;
		"${NUMBER_MODE}")
			updateWebSearchPlayList \
				"${webSearchArgs}"
			number_playing \
				"${tubePlayListPath}" \
				"${playNumber}" \
				"${play_log_file_path}"
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
	"${1:-}" "${2:-}" "${3:-}" "${4:-}" "${5:-}"
