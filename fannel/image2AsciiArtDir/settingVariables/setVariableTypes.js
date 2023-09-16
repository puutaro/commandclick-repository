
PLAY_QUIZ:
	HL:BTN=
		${BTN_CMD}="jsf '${0}' ${playQuizMode}"
			!${BTN_LABEL}=this,
DISPLAY_GALLERY:
	BTN:HL=
			${BTN_CMD}="jsf '${0}' ${DISPLAY_GALLERY}"
			!${BTN_LABEL}=this,
convertImageFile2Ascii:
	LBL:TXT:GB:FL:BTN=
		${TXT_LABEL}="convert image file to ascii"
		|
			${LIST_PATH}="${image2AsciiArtCatchImagePathListFilePath}"
				!${LIMIT_NUM}=10
		|
			${BTN_CMD}="jsf '${0}' ${convertImageFile2Ascii}"
				!${BTN_LABEL}=TO,
TARGET_DIR:
	LBL:TXT:ELSB=
		${TXT_LABEL}=THIS
		|
			${LIST_PATH}="${image2AsciiArtTargetDirListFilePath}"
				!${LIMIT_NUM}=10,
MOVE_OR_DELETE_IMAGE:
	LBL:CB:BTN=
		${TXT_LABEL}=THIS
		|
			ascii!image
		|
			${BTN_CMD}="jsf '${0}' ${MOVE_OR_DELETE_IMAGE}"
			!${BTN_LABEL}=EXEC,
EDIT_TARGET_DIR_NAME:
	BTN:HL=
		${BTN_CMD}="jsf '${0}' ${EDIT_TARGET_DIR_NAME}"
			!${BTN_LABEL}=this,
