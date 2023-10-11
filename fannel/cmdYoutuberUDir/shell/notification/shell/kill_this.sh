#!/bin/bash

current_dir_path=$(dirname $0)
fannelDirPath=$(cd "${current_dir_path}"; cd .. ; pwd)
fannelDirNamePath=$(echo "${fannelDirPath}" | sed 's/Dir$//')
launchPath="${fannelDirPath}/notification/killThis_config.js"

cat \
	"${launchPath}"  \
	| awk \
	'{
		gsub("KILL_JOB_TYPE", "'${fannelDirNamePath}'", $0)
		print $0
	}' \
	| curl -X POST -d "$(cat)" "${INTENT_MONITOR_ADDRESS}" \
	>/dev/null 2>&1
	# > "${INTENT_MONITOR_PATH}" 
