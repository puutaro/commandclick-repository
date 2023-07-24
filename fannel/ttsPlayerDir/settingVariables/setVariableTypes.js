
manageText:
	LBL:TXT:FGB:BTN=
		${TXT_LABEL}=this
		|
			${FGB_DIR_PATH}=${cmdTtsPlayerSaveDirPath}
			!${FGB_SUFFIX}=.txt
		|
			${BTN_CMD}="jsf '${0}' manageText"
			!${BTN_LABEL}=MNG,

playListName:
	LBL:TXT:FGB=
		${TXT_LABEL}=this
		|
			${FGB_DIR_PATH}=${cmdTtsPlayerEditDirPath}
			!${FGB_PREFIX}=${TTS_PREFIX}
			!${FGB_SUFFIX}=.tsv,

playMode:
	LBL:CB=
		${TXT_LABEL}=this
		|
			ordinaly!shuffle!reverse,

PLAY:
	BTN:HL=
		${BTN_CMD}="::TermOut::jsf '${0}'"
			!${BTN_LABEL}=this,

numberPlay:
	TXT:NUM:BTN=
		!1..1000!1
		|
			${BTN_CMD}="::TermOut::jsf '${0}' number"
			!${BTN_LABEL}=Play,

STOP:
	BTN:HL=
		${BTN_CMD}="jsf '${0}' STOP"
			!${BTN_LABEL}=this,
EDIT_PLAY_LIST:
	BTN:HL=
		${BTN_CMD}="jsf '${0}' EDIT_PLAY_LIST"
			!${BTN_LABEL}=this,

Speed:
	TXT:NUM=
		!1..100!1,

Pitch:
	TXT:NUM=
		!1..100!1,

toLang:
	CB=
		-!ja!en!zh!es!ko,

onTrack:
	CB=
		ON!OFF,

gmailToFile:
	LBL:TXT:ELSB:BTN=
		${TXT_LABEL}="Gmail contents to play list"
		|
			${LIST_PATH}=${cmdTtsPlayerGmailListFilePath}
			!${LIMIT_NUM}=10
		|
			${BTN_CMD}="::TermLong::jsf '${0}' gmailToFile",
