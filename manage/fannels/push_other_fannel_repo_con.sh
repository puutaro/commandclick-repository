#!/bin/bash

set -ue

readonly WORKING_DIR_PATH=$(pwd)
readonly TMP_GH_ACTION_DIR_NAME="temp_gh_action"
readonly TMP_GH_ACTION_DIR_PATH="${WORKING_DIR_PATH}/${TMP_GH_ACTION_DIR_NAME}"
readonly FANNEL_STOCK_DIR_NAME="fannel"
readonly FANNEL_STOCK_DIR_PATH="${WORKING_DIR_PATH}/${FANNEL_STOCK_DIR_NAME}"


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
	mkdir "${TMP_GH_ACTION_DIR_NAME}"
	echo pwd
	pwd
	cd "${TMP_GH_ACTION_DIR_NAME}"
	echo pwd
	pwd
	git clone "https://github.com/puutaro/selectTyper"
	ls
	echo ${gh_dir_name}
	ls "${gh_dir_name}"
	local cp_desti_dir_path=
	cp -arvf \
		"${fannel_dir_path}" \
		"${FANNEL_STOCK_DIR_PATH}"/

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
	echo "fannel_path: ${fannel_path}"
	cp -avf \
		"${fannel_path}" \
		"${FANNEL_STOCK_DIR_PATH}"/
	rm -rf "${fannel_dir_path}"
}

clone_and_cp \
	"https://github.com/puutaro/selectTyper"

echo pwd
pwd
cd "${WORKING_DIR_PATH}"
echo pwd
pwd

readonly ignore_list_path="manage/fannels/ignore_list.txt"
readonly output_fannels_list="manage/fannels/list/fannels.txt"
readonly grep_cmd=$(\
	cat "${ignore_list_path}" \
	| awk '{
		if(!$0) next
		printf " | grep -Ev \x22^"$0"\x22"
	}'\
)

cd "${FANNEL_STOCK_DIR_NAME}"

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
	-and -not -name '*README.md' \
	-and -not -name '*difbk_ignore' \
	-printf '%P\n' ${grep_cmd}"

bash -c "${find_cmd}" \
	| sort \
	| awk '1'