
musicDir:
	LBL:TXT:ELSB:DIR=
		${TXT_LABEL}=this
		|
			${LIST_PATH}=${cmdMusicPlayerDirListFilePath}
				?${LIMIT_NUM}=10,
musicPlayListName:
	LBL:TXT:FGB=
		${TXT_LABEL}=this
		|
			${FCB_DIR_PATH}=${cmdMusicPlayerEditDirPath}
				?${FCB_PREFIX}=music
				?${FCB_SUFFIX}=.tsv,
musicPlay:
	LBL:CB=
		${TXT_LABEL}=this
		|
			ordinaly?shuffle?reverse,
PLAY:
	BTN:HL=
		${BTN_CMD}=::TermOut::jsf '${0}'
			?${BTN_LABEL}=this,
numberPlay:
	LBL:TXT:NUM:BTN=
		${TXT_LABEL}=this
		|
			?1..1000?1
		|
			${BTN_CMD}=::TermOut::jsf '${0}' number
				?${BTN_LABEL}=Play,
startNum:
	LBL:TXT:NUM:BTN=
		${TXT_LABEL}=this
		|
			?0..10000?1
		|
			${BTN_CMD}=jsf '${0}' initStartNum
				?${BTN_LABEL}=to0,
endNum:
	LBL:TXT:NUM:BTN=
		${TXT_LABEL}=this
		|
			?0..10000?1
		|
			${BTN_CMD}=jsf '${0}' initEndNum
				?${BTN_LABEL}=to0,
STOP:
	BTN:HL=
		${BTN_CMD}="jsf '${0}' stop"
			?${BTN_LABEL}=this,
Install:
	BTN:HL=
		${BTN_CMD}=jsf '${0}'
			?${BTN_LABEL}=this,
EDIT_MUSIC_PLAY_LIST:
	BTN:HL=
		${BTN_CMD}=jsf '${0}' EDIT_MUSIC_PLAY_LIST
			?${BTN_LABEL}=this,
onResumePlay:
	LBL:CB=
		${TXT_LABEL}=this
		|
			ON?OFF,
