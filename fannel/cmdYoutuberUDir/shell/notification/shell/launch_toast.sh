#!/bin/bash

launch_toast(){
	echo \
	"intentType=toast,
	message=${1}," \
	| curl -X POST -d "$(cat)" "${INTENT_MONITOR_ADDRESS}" \
	>/dev/null 2>&1
}