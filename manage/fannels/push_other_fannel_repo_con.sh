#!/bin/bash

set -ue

readonly WORKING_DIR_PATH=$(pwd)
readonly TMP_GH_ACTION_DIR_NAME="temp_gh_action"
readonly TMP_GH_ACTION_DIR_PATH="${WORKING_DIR_PATH}/${TMP_GH_ACTION_DIR_NAME}"
readonly FANNEL_STOCK_DIR_NAME="fannel"
readonly FANNEL_STOCK_DIR_PATH="${WORKING_DIR_PATH}/${FANNEL_STOCK_DIR_NAME}"
readonly REPO_URL_LIST_PATH="manage/fannels/input_txt_list/repo_url_list.txt"

function echo_fannel_path(){
	local gh_dir_path="${1}"
	local gh_dir_name="${2}"
	local fannel_js_path="${gh_dir_path}/${gh_dir_name}.js"
	local fannel_sh_path="${gh_dir_path}/${gh_dir_name}.sh"
	if [ -f "${fannel_js_path}" ]; then
		echo "${fannel_js_path}"
	fi
	if [ -f "${fannel_sh_path}" ]; then
		echo "${fannel_sh_path}"
	fi
}

function exec_cd(){
	local cd_deti_dir_path="${1}"
	echo pwd
	pwd
	cd "${cd_deti_dir_path}"
	echo pwd
	pwd
}

function exec_cp(){
	local cp_src_path="${1}"
	local cp_desti_path="${2}"
	echo "cp"
	echo "from: ${cp_src_path}"
	echo "to: ${cp_desti_path}"
	cp -avf \
		"${cp_src_path}" \
		"${cp_desti_path}"/
}

function clone_and_cp(){
	local git_hub_repo_url="${1}"
	local gh_dir_name="$(basename "${git_hub_repo_url}")"
	local gh_dir_path="${TMP_GH_ACTION_DIR_PATH}/${gh_dir_name}"
	local fannel_dir_name="${gh_dir_name}Dir"
	local fannel_dir_path="${gh_dir_path}/${fannel_dir_name}"
	local fannel_dir_desti_path="${FANNEL_STOCK_DIR_PATH}/${fannel_dir_name}"
	local readme_path="${gh_dir_path}/README.md"
	exec_cd "${WORKING_DIR_PATH}"
	mkdir -p "${TMP_GH_ACTION_DIR_PATH}"
	exec_cd "${TMP_GH_ACTION_DIR_NAME}"
	git clone "${git_hub_repo_url}"
	local is_five_over_size=$(\
		find "${fannel_dir_path}"  -size +10M\
	)
	case "${is_five_over_size}" in
		"") 
			echo "## Push, thanks to less 10M";;
		*) 
			echo "## Skip, due to over 10M"
			rm -rf "${TMP_GH_ACTION_DIR_PATH}"
			return
			;;
	esac
	exec_cp \
		"${fannel_dir_path}" \
		"${FANNEL_STOCK_DIR_PATH}"
	exec_cp \
		"${readme_path}" \
		"${fannel_dir_desti_path}"

	local fannel_path="$(\
		echo_fannel_path \
			"${gh_dir_path}" \
			"${gh_dir_name}" \
	)"
	case "${fannel_path}" in
		"")  
			rm -rf "${TMP_GH_ACTION_DIR_PATH}"
			return
			;;
	esac
	exec_cp \
		"${fannel_path}" \
		"${FANNEL_STOCK_DIR_PATH}"
	rm -rf "${TMP_GH_ACTION_DIR_PATH}"
}

function exec_git_clone(){
	local times=1
	for repo_url in $(cat "${REPO_URL_LIST_PATH}")
	do
		echo "### $(date '+%Y/%m-%dT%H:%M:%s') [${times}] ${repo_url}"
		case "${repo_url}" in
			"") ;;
			*) clone_and_cp "${repo_url}" 
				;;
		esac
		times=$((times + 1))
	done
}

exec_git_clone

# exec_cd "${WORKING_DIR_PATH}"
# readonly ignore_list_path="manage/fannels/input_txt_list/ignore_list.txt"
# readonly output_fannels_list="manage/fannels/list/fannels.txt"
# readonly grep_cmd=$(\
# 	cat "${ignore_list_path}" \
# 	| awk '{
# 		if(!$0) next
# 		printf " | grep -Ev \x22^"$0"\x22"
# 	}'\
# )

# exec_cd "${FANNEL_STOCK_DIR_PATH}"

# readonly find_cmd="find  \
# 	-type f \
# 	-not -path '*/.git/*' \
# 	-not -path '*/.github/*' \
# 	-and -not -path '*/exp_fannel/*' \
# 	-and -not -path '*/old/*' \
# 	-and -not -path '*/.difbk/*' \
# 	-and -not -path '*/manage/*' \
#  	-and -not -name '*gitignore' \
# 	-and -not -name '*LICENSE' \
# 	-and -not -name '*difbk_ignore' \
# 	-printf '%P\n' ${grep_cmd}"

# bash -c "${find_cmd}" \
# 	| sort \
# 	| awk '1'