
EDIT_MENU:
	LBL:DSL:BTN=
		${TEXT_LABEL}=THIS
		|
			${LIST_PATH}="${selectMenuListFilePath}"
			!${LIMIT_NUM}=20
		|
			${BTN_CMD}="jsf '${0}' menuAdd"
			!${BTN_LABEL}=ADD,
