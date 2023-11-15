#!/bin/bash

set -eu

readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly FANNEL_DIR_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" cmdMusicPlayerDirPath\
)"
readonly NOTI_SHELL_DIR_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" cmdMusicPlayerNotiShellDirPath\
)"
readonly NOTI_LAUNCH_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/noti_launch.sh"
readonly NOTI_ORDINALY_UPDATE_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/ordinaly_update_title_msg.sh"
readonly NOTI_EXIT_SHELL_PATH="${NOTI_SHELL_DIR_PATH}/noti_exit.sh"
readonly INSTALL_EVIDENCE_FILE_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" cmdMusicPlayerInstallCompFilePath\
)"
readonly PLAY_PROCESS_DIR_PATH="${FANNEL_DIR_PATH}/process"
readonly MUSIC_HISTORY_PATH="${PLAY_PROCESS_DIR_PATH}/musicHistory.txt"
readonly MUSIC_HISTORY_TSV_PATH="${PLAY_PROCESS_DIR_PATH}/musicHistory.tsv"
readonly TMP_PLAY_LIST_NAME="tmp_play_list"
readonly TMP_PLAY_LIST_PATH="${PLAY_PROCESS_DIR_PATH}/${TMP_PLAY_LIST_NAME}"
readonly SHUFFLE_MODE="shuffle"
readonly ORDINALY_MODE="ordinaly"
readonly NUMBER_MODE="number"
readonly STOP_MODE="stop"
readonly INSTALL_MODE="install"
readonly URL_LAUNCH_ACTION_NAME="com.puutaro.commandclick.url.launch"
readonly NOTIFICATION_CAHNEL_NUM="$(\
	get_rvar "${REPLACE_VARS_CON}" CHANNEL_NUM \
)"
readonly MPV_TMP_SOCKET_PATH="$(\
	get_rvar "${REPLACE_VARS_CON}" MPV_SOCKET \
)"

package_installer(){
	sudo apt-get install -y \
		mpv \
		socat \
	&& pip3 install -U yt-dlp \
	&& touch "${INSTALL_EVIDENCE_FILE_PATH}" \
	&& echo "complete installation" \
	|| echo "Retry install"
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
	cut_music_history_limit_over
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
	| tee  -a "${MUSIC_HISTORY_PATH}" \
	&
	local mpv_pid=$!
	launch_notification \
		"${mpv_pid}"
}


number_playing(){
	local tubePlayListPath="${1}"
	local number="${2}"
	expr "$number" : "[0-9]*$" >&/dev/null || return
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
			package_installer
			exit 0
			;;
	esac
}

play_mode_handler \
	"${1:-}" "${2:-}" "${3:-}" "${4:-}"
