#!/bin/bash

set -ue

readonly ocrTargetPath="${1}"
readonly ocrTargetFileName="$(basename "${ocrTargetPath}")"
readonly ocrTargetFileRawName="$(\
	echo "${ocrTargetFileName}" \
		| sed 's/\.[a-z0-9A-Z]*$//'\
)"

readonly ocrLang="${2}"
readonly fannelName="${3}"
readonly currentDirPath="$(dirname "${0}")"
readonly notificationDirPath="${currentDirPath}/notification"
export notificationExitShellPath="${notificationDirPath}/exit_notification.sh"
export notificationFinishOpenShellPath="${notificationDirPath}/finish_open_notification.sh"
readonly tempDirPath="${currentDirPath}/temp"
mkdir -p "${tempDirPath}"
readonly currentAppDirPath="$(dirname "${currentDirPath}")"
readonly ocrViewerOldPlayDirPath="${currentAppDirPath}/old"
readonly inputTempImageDirPath="${tempDirPath}/input_image"
readonly outputTempTxtDirPath="${tempDirPath}/output_txt"
readonly ocrResultOutputFilePath="${ocrViewerOldPlayDirPath}/${ocrTargetFileRawName}.txt"
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
		--button1-action "bash \"${notificationExitShellPath}\"" \
		--on-delete "bash \"${notificationExitShellPath}\""
}
export -f updateNotification

clearNotification(){
	termux-notification-remove \
		"${notificationId}"
}

finishOpenNotification(){
	termux-notification \
		--title "ocr finished" \
		--id "${notificationId}" \
		--button1 OPEN \
		--button1-action "bash \"${notificationFinishOpenShellPath}\" \"${ocrResultOutputFilePath}\" \"${fannelName}\"" \
		--on-delete "bash \"${notificationExitShellPath}\""
}


moveImage(){
	local noPdf="$(\
			echo "${ocrTargetPath}" \
				| grep -vE "\.pdf$" \
			)"
	case "${noPdf}" in
		"") ;;
		*) cp -f \
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
					print "echo \x22extract.. "fileRawName" ("process_num"/"totalProcess")\x22"
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
		> "${ocrResultOutputFilePath}"
}

echo -e "\n### $(date '+%Y-%m-%d %H:%M:%S') ocr start"
updateNotification \
	"start"
moveImage || clearNotification
execOcr  || clearNotification
concatText  || clearNotification
echo "### $(date '+%Y-%m-%d %H:%M:%S') ocr finished"
echo "click play button"
finishOpenNotification
