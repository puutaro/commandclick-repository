

scheduleDate:
	TXT:DT=,
biginTime:
	TXT:TM=,
endTime:
	TXT:TM=,
email:
	TXT:ELSB=
		${LIST_PATH}=${EMAIL_LIST_FILE_PATH}
			!${LIMIT_NUM}=10,
LAUNCH_URL:
	LBL:TXT:ELSB:BTN=
		${TXT_LABEL}=THIS
		|
			${LIST_PATH}=${LAUNCH_URL_LIST_FILE_PATH}
			!${LIMIT_NUM}=10
		|
			${BTN_CMD}="jsf '${0}' url",
