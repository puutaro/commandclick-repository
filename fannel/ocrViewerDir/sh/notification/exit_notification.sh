#!/bin/bash

kill_process(){
	local process_name="${1}"
	kill $(\
		ps aux \
		| grep "${process_name}" \
		| awk '{print $2}' \
	)
}
kill_process \
	"tesseract"
kill_process \
	"ocr.sh"
termux-notification-remove \
	"ocrNoti"