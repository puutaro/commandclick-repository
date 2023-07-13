#!/bin/bash

set -ue

readonly outDirName="${1}"
readonly sourceFilePath="${2}"
readonly onlySync="${3}"
readonly lang="${4:-en}"

readonly currentShellPath="${0}"
readonly parentDirPath="$(dirname "${currentShellPath}")"
readonly atomicFileName="$(\
		basename "${sourceFilePath}" \
		| sed 's/\.[a-zA-Z0-9]*$//' \
	)"
readonly txtFileName="${atomicFileName}.txt"
readonly mp3FileName="${atomicFileName}.mp3"
readonly txtDirPath="${outDirName}/txt"
readonly txtFilePath="${txtDirPath}/${txtFileName}"
readonly execGttsCliPath="${parentDirPath}/lib/execGttsCli.sh"

. "${execGttsCliPath}"

cd "${outDirName}"


mkdir -p "${txtDirPath}"
cat "${sourceFilePath}" \
	> "${txtFilePath}"

case "${onlySync}" in
	"ON") 
			echo "sync ok"
			exit 0
		;;
	*) ;;
esac

rm -rf "${mp3FileName}"

echo "$(date '+%Y-%m-%d %H:%M:%S') creating..."
cat "${sourceFilePath}" \
	| execGttsCli \
		"${lang}" \
		"${mp3FileName}" 2>&1
