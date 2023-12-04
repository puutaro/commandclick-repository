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

function clone_and_cp(){
	local git_hub_repo_url="${1}"
	local gh_dir_name="$(basename "${git_hub_repo_url}")"
	local gh_dir_path="${TMP_GH_ACTION_DIR_PATH}/${gh_dir_name}"
	local fannel_dir_name="${gh_dir_name}Dir"
	local fannel_dir_path="${gh_dir_path}/${fannel_dir_name}"
	local fannel_dir_desti_path="${FANNEL_STOCK_DIR_PATH}/${fannel_dir_name}"
	local readme_path="${gh_dir_path}/README.md"
	echo pwd
	pwd
	cd "${WORKING_DIR_PATH}"
	echo pwd
	pwd
	mkdir -p "${TMP_GH_ACTION_DIR_PATH}"
	echo pwd
	pwd
	cd "${TMP_GH_ACTION_DIR_NAME}"
	echo pwd
	pwd
	git clone "${git_hub_repo_url}"
	ls
	echo ${gh_dir_name}
	ls "${gh_dir_name}"
	echo "cp"
	echo "from: ${fannel_dir_path}"
	echo "to: ${FANNEL_STOCK_DIR_PATH}"
	cp -arvf \
		"${fannel_dir_path}" \
		"${FANNEL_STOCK_DIR_PATH}"/

	echo "cp" 
	echo "from: ${readme_path}"
	echo "to: ${fannel_dir_desti_path}"
	cp -avf \
		"${readme_path}" \
		"${fannel_dir_desti_path}/"

	local fannel_path="$(\
		echo_fannel_path \
			"${gh_dir_path}" \
			"${gh_dir_name}" \
	)"
	case "${fannel_path}" in
		"")  
			rm "${fannel_dir_path}"
			return
			;;
	esac
	echo "cp"
	echo "from: ${fannel_path}"
	echo "to: ${FANNEL_STOCK_DIR_PATH}"
	cp -avf \
		"${fannel_path}" \
		"${FANNEL_STOCK_DIR_PATH}"/
	rm -rf "${TMP_GH_ACTION_DIR_PATH}"
}

function exec_git_clone(){
	# local old_ifs="${IFS}"
	# local IFS=$'\n'
	# local repo_url_list=$(cat "${REPO_URL_LIST_PATH}")
	# local IFS="${old_ifs}"
	# local IFS=$'\n'
	local times=1
	for repo_url in $(cat "${REPO_URL_LIST_PATH}")
	do
		echo "[${times}] ${repo_url}"
		case "${repo_url}" in
			"") ;;
			*) clone_and_cp "${repo_url}" 
				;;
		esac
		times=$((times + 1))
	done
}

exec_git_clone


readonly ignore_list_path="manage/fannels/input_txt_list/ignore_list.txt"
readonly output_fannels_list="manage/fannels/list/fannels.txt"
readonly grep_cmd=$(\
	cat "${ignore_list_path}" \
	| awk '{
		if(!$0) next
		printf " | grep -Ev \x22^"$0"\x22"
	}'\
)

echo pwd
pwd
cd "${FANNEL_STOCK_DIR_NAME}"
echo pwd
pwd

readonly find_cmd="find  \
	-type f \
	-not -path '*/.git/*' \
	-not -path '*/.github/*' \
	-and -not -path '*/exp_fannel/*' \
	-and -not -path '*/old/*' \
	-and -not -path '*/.difbk/*' \
	-and -not -path '*/manage/*' \
 	-and -not -name '*gitignore' \
	-and -not -name '*LICENSE' \
	-and -not -name '*difbk_ignore' \
	-printf '%P\n' ${grep_cmd}"

bash -c "${find_cmd}" \
	| sort \
	| awk '1'