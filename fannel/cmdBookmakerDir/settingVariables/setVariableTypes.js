

bookmarkListName:
	LBL:TXT:FGB=
		${TXT_LABEL}=this
		|
			${FCB_DIR_PATH}=${CMD_BOOKMAKER_EDIT_DIR_PATH}
				!${FCB_PREFIX}=book
				!${FCB_SUFFIX}=.tsv,
EDIT_BOOKMARK_NAME:
	BTN:HL=
		${BTN_CMD}=jsf '${0}' EDIT_BOOKMARK_NAME
			!${BTN_LABEL}=this,
ON_DIALOG:
	CB=
		"true!false"

