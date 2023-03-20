#!/bin/bash



max_retweet(){
	local cmdTwitterDirPath="$(dirname "${0}")"
	local currentAppDirPath="$(dirname "${cmdTwitterDirPath}")"
	local exec_url_load_finished_path="${currentAppDirPath}/system/url/urlLoadFinished"
	local first_load_finished_con=$(cat "${exec_url_load_finished_path}")
	while :
	do
		sleep 1
		local second_load_finished_con=$(cat "${exec_url_load_finished_path}")
		case "${second_load_finished_con}" in
			"${first_load_finished_con}") ;;
			*) break ;;
		esac
	done
	retweet_js_path="${cmdTwitterDirPath}/js/exec_retweet.jsx"
	retweet_js_con="$(\
		cat "${retweet_js_path}" \
			| sed 's/^\/\/.*//' \
			| sed 's/^[\t ]*\/\/.*//' \
			| tr '\n' ' ' \
	)"
	am broadcast \
		-a "com.puutaro.commandclick.url.launch" \
		--es url "javascript:(function() { ${retweet_js_con} })();"
	exit 0
}


max_retweet
