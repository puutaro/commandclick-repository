
gmailDraftUrl:
	LBL:TXT:ELSB=
		${TXT_LABEL}=this
		|
			${LIST_PATH}=${sendClipToGmailUrlListFilePath}
			?${LIMIT_NUM}=10,

gmailDraftListURL:
	LBL:TXT:ELSB=
		${TXT_LABEL}=Gmail draft list url
		|
			${LIST_PATH}=${sendClipToGmailDraftUrlListFilePath}
			?${LIMIT_NUM}=10,

DISPLAY_DRAFT_LIST:
	BTN:HL=
		${BTN_CMD}=::TermLong::jsf '${0}' DRAFT_LIST
		?${BTN_LABEL}=this,

CLIP_TEXT:
	LBL:TXT:BTN=
		${TXT_LABEL}=Clip text
		|
			${BTN_CMD}=::TermLong::jsf '${0}' CLIP_TEXT
			?${BTN_LABEL}=COPY,
