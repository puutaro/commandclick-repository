

DISPLAY_DRAFT_LIST:
	BTN:HL=
		${BTN_CMD}=::TermLong::jsf '${0}' DRAFT_LIST
		!${BTN_LABEL}=this,
CLIP_TEXT:
	TXT:BTN=
		${BTN_CMD}=::TermLong::jsf '${0}' CLIP_TEXT
		!${BTN_LABEL}=COPY,