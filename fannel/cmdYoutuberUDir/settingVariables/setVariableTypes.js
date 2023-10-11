

searchWord:
	LBL:TXT:ELSB=
		${TXT_LABEL}=this
		|
			${LIST_PATH}=${cmdTubePlayerListFilePath}
				!${LIMIT_NUM}=20,
playMode:
	LBL:CB=
		${TXT_LABEL}=this
		|
			shuffle!ordinaly!reverse,
onWebSearchMode:
	LBL:CB=
		${TXT_LABEL}=this
		|
			ON!OFF,
PLAY:
	BTN:HL=
		${BTN_CMD}=::TermOut::jsf '${0}'
			!${BTN_LABEL}=this,
STOP:
	BTN:HL=
		${BTN_CMD}="jsf '${0}' stop"
			!${BTN_LABEL}=this,
numberPlay:
	LBL:TXT:NUM:BTN=
		${TXT_LABEL}=this
		|
			!1..1000!1
		|
			${BTN_CMD}=::TermOut::jsf '${0}' number
				!${BTN_LABEL}=PLAY,
minMinutes:
	LBL:TXT:NUM:BTN=
		${TXT_LABEL}=this
		|
			!0..1000!1
		|
			${BTN_CMD}=jsf '${0}' initMinMinutes
				!${BTN_LABEL}=to0,
maxMinutes:
	LBL:TXT:NUM:BTN=
		${TXT_LABEL}=this
		|
			!0..1000!1
		|
			${BTN_CMD}=jsf '${0}' initMaxMinutes
				!${BTN_LABEL}=to0,
tubePlayListName:
	LBL:TXT:FGB=
		${TXT_LABEL}=this
		|
			${FCB_DIR_PATH}=${cmdTubePlayerEditDirPath}
				!${FCB_PREFIX}=tube
				!${FCB_SUFFIX}=.tsv,
EDIT_TUBE_PLAY_LIST:
	BTN:HL=
		${BTN_CMD}=jsf '${0}' EDIT_TUBE_PLAY_LIST
			!${BTN_LABEL}=EDIT TUBE PLAY LIST,
Install:
	BTN:HL=
		${BTN_CMD}=jsf '${0}'
			!${BTN_LABEL}=this,
