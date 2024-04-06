

TXT_TO_CLIP:
	LBL:TXT:ELSB=
		${TXT_LABEL}=THIS
		|
			${LIST_PATH}=${REQ_LIST_FILE_PATH}
				?${LIMIT_NUM}=30
		|
			${BTN_CMD}=::TermLong::jsf '${0}' clip,
REMOVE_TEXT:
	LBL:TXT:ELSB:BTN=
		${TXT_LABEL}=THIS
		|
			${LIST_PATH}=${REQ_LIST_FILE_PATH}
		|
			${BTN_CMD}=jsf '${0}' remove
				?${BTN_LABEL}=DEL,
