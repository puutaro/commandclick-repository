

searchWord:
	LBL:TXT:ELSB=
		${TXT_LABEL}=this
		|
			${LIST_PATH}=${cmdTubePlayerListFilePath}
				?${LIMIT_NUM}=20,
playMode:
	LBL:CB=
		${TXT_LABEL}=this
		|
			shuffle?ordinaly?reverse,
onSearchMode:
	LBL:CB=
		${TXT_LABEL}=this
		|
			SHORT?RECENT?LOG_RND?LOG_FREQ?OFF,
PLAY:
	BTN:HL=
		${BTN_CMD}=::TermOut::jsf '${0}'
			?${BTN_LABEL}=this,
STOP:
	BTN:HL=
		${BTN_CMD}="jsf '${0}' stop"
			?${BTN_LABEL}=this,
numberPlay:
	LBL:TXT:NUM:BTN=
		${TXT_LABEL}=this
		|
			?1..1000?1
		|
			${BTN_CMD}=::TermOut::jsf '${0}' number
				?${BTN_LABEL}=PLAY,
minMinutes:
	LBL:TXT:NUM:BTN=
		${TXT_LABEL}=this
		|
			?0..1000?1
		|
			${BTN_CMD}=jsf '${0}' initMinMinutes
				?${BTN_LABEL}=to0,
maxMinutes:
	LBL:TXT:NUM:BTN=
		${TXT_LABEL}=this
		|
			?0..1000?1
		|
			${BTN_CMD}=jsf '${0}' initMaxMinutes
				?${BTN_LABEL}=to0,
tubePlayListName:
	LBL:TXT:FGB=
		${TXT_LABEL}=this
		|
			${FCB_DIR_PATH}=${cmdTubePlayerEditDirPath}
				?${FCB_PREFIX}=tube
				?${FCB_SUFFIX}=.tsv,
EDIT_TUBE_PLAY_LIST:
	BTN:HL=
		${BTN_CMD}=jsf '${0}' EDIT_TUBE_PLAY_LIST
			?${BTN_LABEL}=EDIT TUBE PLAY LIST,
playLogName:
	LBL:TXT:FGB=
		${TXT_LABEL}=this
		|
			${FCB_DIR_PATH}=${PLAY_LOG_DIR_PATH}
				?${FCB_PREFIX}=playLog
				?${FCB_SUFFIX}=NoExtend,
EDIT_PLAY_LOG_NAME:
	LBL:TXT:BTN=
		${TXT_LABEL}=THIS
		|
			${BTN_CMD}=jsf '${0}' EDIT_PLAY_LOG_NAME
				?${BTN_LABEL}=edit,
playLogOut:
	BTN:HL=
		${BTN_CMD}=::TermOut::::TermLong::jsf '${0}' playLogOut
			?${BTN_LABEL}=PLAY LOG,
Install:
	BTN:HL=
		${BTN_CMD}=jsf '${0}'
			?${BTN_LABEL}=this,
