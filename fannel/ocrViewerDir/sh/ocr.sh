#!/bin/bash

set -ue

readonly ocrTargetPath="${1}"
readonly ocrTargetFileName="$(basename "${ocrTargetPath}")"
readonly ocrTargetFileRawName="$(\
	echo "${ocrTargetFileName}" \
		| sed 's/\.[a-z0-9A-Z]*$//'\
)"

readonly ocrLang="${2}"
readonly currentDirPath="$(dirname "${0}")"
readonly notificationDirPath="${currentDirPath}/notification"
export notificationExitShellPath="${notificationDirPath}/exit_notification.sh"
readonly tempDirPath="${currentDirPath}/temp"
mkdir -p "${tempDirPath}"
readonly currentAppDirPath="$(dirname "${currentDirPath}")"
readonly ocrViewerOldPlayDirPath="${currentAppDirPath}/old"
readonly inputTempImageDirPath="${tempDirPath}/input_image"
readonly outputTempTxtDirPath="${tempDirPath}/output_txt"
rm -rf "${inputTempImageDirPath}"
mkdir -p "${inputTempImageDirPath}"
rm -rf "${outputTempTxtDirPath}"
mkdir -p "${outputTempTxtDirPath}"
export notificationId="ocrNoti"

updateNotification(){
	local content="${1}"
	termux-notification \
		--title "ocr..." \
		--id "${notificationId}" \
		--content "${content}" \
		--button1 exit \
		--button1-action "bash ${notificationExitShellPath}" \
		--on-delete "bash ${notificationExitShellPath}"
}
export -f updateNotification

clearNotification(){
	termux-notification-remove \
		"${notificationId}"
}

moveImage(){
	local noPdf="$(\
			echo "${ocrTargetPath}" \
				| grep -vE "\.pdf$" \
			)"
	echo "${noPdf}"
	case "${noPdf}" in
		"") ;;
		*) mv \
			"${ocrTargetPath}" \
			"${inputTempImageDirPath}/${ocrTargetFileName}"
			return
			;;
	esac
	updateNotification \
		"pdf to jpeg.."
	pdftoppm \
		-jpeg "${ocrTargetPath}" \
		"${inputTempImageDirPath}/${ocrTargetFileRawName}"
}

execOcr(){
	updateNotification \
		"extract.."
	mkdir -p "${ocrViewerOldPlayDirPath}"
	local inputFilePathCon=$(\
			find \
				"${inputTempImageDirPath}" \
				-type f \
			| sort \
		)
	local totalProcess="$(\
			echo "${inputFilePathCon}" \
			| wc -l \
	)"
	local ocrShell=$(\
			echo "${inputFilePathCon}" \
			| awk \
				-v totalProcess="${totalProcess}" \
				-v ocrLang="${ocrLang}" \
				-v outputTempTxtDirPath="${outputTempTxtDirPath}" \
				'BEGIN{
					process_num=0
				}
				{
					process_num++
					inputFilePathConListLength = split(\
						$0, \
						inputFilePathConList, \
						"/" \
					)
					fileRawName = inputFilePathConList[inputFilePathConListLength]
					sub(/.[a-zA-Z0-9]*$/, "", fileRawName) 
					print "updateNotification \x22extract.. "fileRawName" ("process_num"/"totalProcess")\x22"
					print "tesseract \x22"$0"\x22 \x22"outputTempTxtDirPath"/"fileRawName"\x22 -l " ocrLang
				}'
	)
	bash -c "${ocrShell}"
}

concatText(){
	local outputTempTxtDirPathShell="$(
		find \
			"${outputTempTxtDirPath}" \
			-type f \
		| sort \
		| awk '{
				print "cat \x22"$0"\x22"
			}'
		)"
	bash -c "${outputTempTxtDirPathShell}" \
		| tr -d ' ' \
		> "${ocrViewerOldPlayDirPath}/${ocrTargetFileRawName}.txt"
}

updateNotification \
	"start" \
	2>&1
moveImage 2>&1 || clearNotification
execOcr 2>&1 || clearNotification
concatText 2>&1  || clearNotification
updateNotification \
	"extract ok" \
	2>&1
sleep 5
clearNotification 2>&1
