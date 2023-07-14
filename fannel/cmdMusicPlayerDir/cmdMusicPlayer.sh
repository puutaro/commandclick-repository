#!/bin/bash

set -eu


PARENT_DIR_PATH="$(dirname "$0")"
PLAY_PROCESS_DIR_PATH="${PARENT_DIR_PATH}/process"
MUSIC_HISTORY_PATH="${PLAY_PROCESS_DIR_PATH}/musicHistory.txt"
MUSIC_HISTORY_TSV_PATH="${PLAY_PROCESS_DIR_PATH}/musicHistory.tsv"
TMP_PLAY_LIST_NAME="tmp_play_list"
TMP_PLAY_LIST_PATH="${PLAY_PROCESS_DIR_PATH}/${TMP_PLAY_LIST_NAME}"
SHUFFLE_MODE="shuffle"
ORDINALY_MODE="ordinaly"
NUMBER_MODE="number"
STOP_MODE="stop"
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

cut_music_history_limit_over(){
	local history_limit_num=1000
	if [ ! -f "${MUSIC_HISTORY_PATH}" ];then
		touch "${MUSIC_HISTORY_PATH}"
		return
	fi
	if [ ! -f "${MUSIC_HISTORY_TSV_PATH}" ];then
		touch "${MUSIC_HISTORY_TSV_PATH}"
	fi
	local grep_prefix="Playing: "
	local music_history_con="$(\
		cat "${MUSIC_HISTORY_PATH}" \
		| grep "${grep_prefix}" \
		| sed '/^$/d' \
		| tail -"${history_limit_num}" \
	)"
	sleep 0.1
	echo \
		"${music_history_con}" \
		| sed '/^$/d' \
		> "${MUSIC_HISTORY_PATH}"
	cat \
		<(\
			echo "track"\
		) \
		<(\
			echo \
				"${music_history_con}" \
		) \
		| sed '/^$/d' \
		> "${MUSIC_HISTORY_TSV_PATH}"
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
	cut_music_history_limit_over
	stop_termux_mpv
	sleep 0.5
	termuxmpv \
			--no-video \
			${play_mode}  \
			--loop-playlist=inf \
			--playlist="${TMP_PLAY_LIST_PATH}" \
	| tee  -a "${MUSIC_HISTORY_PATH}"
}


number_playing(){
	local tubePlayListPath="${1}"
	local number="${2}"
	if [[ ${number} =~ ^[0-9]+(\.[0-9]+)?$ ]] then
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
	fi
}


play_mode_handler(){
	local play_mode="${1}"
	local tubePlayListPath="${2}"
	local musicDir="${3:-}"
	local playNumber="${4:-}"
	if [ ! -d "${PLAY_PROCESS_DIR_PATH}" ]; then
		mkdir -p "${PLAY_PROCESS_DIR_PATH}";
	fi
	judge_stop_by_play_mode \
		"${play_mode}"
	echo "play_mode: ${play_mode}"
	echo "playListPath: ${tubePlayListPath}"
	echo "playNumber: ${playNumber}"
	case "${play_mode}" in
		"${SHUFFLE_MODE}")
			cat "${tubePlayListPath}" \
				| cut -f 2 > "${TMP_PLAY_LIST_PATH}"
			wait
			play_temp_list \
				"--shuffle"
			exit 0
			;;
		"${ORDINALY_MODE}")
			cat "${tubePlayListPath}" \
				| cut -f 2 > "${TMP_PLAY_LIST_PATH}"
			wait
			play_temp_list
			exit 0
			;;
		"${NUMBER_MODE}")
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
	esac
}

play_mode_handler \
	"${1:-}" "${2:-}" "${3:-}" "${4:-}"
