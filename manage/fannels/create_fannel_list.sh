#!/bin/bash


readonly ignore_list_path="manage/fannels/ignore_list.txt"
readonly grep_cmd=$(\
	cat "${ignore_list_path}" \
	| awk '{
		if(!$0) next
		printf " | grep -Ev \x22^"$0"\x22"
	}'\
)

cd fannel

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
	| sed "/^$/d" \
	> "${ignore_list_path}"

