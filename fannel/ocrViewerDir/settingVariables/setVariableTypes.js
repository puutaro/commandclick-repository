
ocrTargetPath:
	TXT:LBL:GB:FL=
		${TXT_LABEL}=this
		|
			${LIST_PATH}="${ocrViewerTxtListFilePath}"
			?${LIMIT_NUM}=10
		|
			initialPath=`${STORAGE}/Download`
			?suffix=`${TXT_SUFFIX}&${PDF_SUFFIX}`
			?macro=FROM_RECENT_DIR
		,
EXEC_EXTRACT:
	BTN:HL=
		${BTN_CMD}="jsf '${0}' ${extractMode}"
		?${BTN_LABEL}=this,
TTS_PLAY:
	BTN:HL=
		${BTN_CMD}="jsf '${0}' ${ttsPlayMode}"
		?${BTN_LABEL}=this,
CLEAR_CACHE:
	BTN:HL=
		${BTN_CMD}="jsf '${0}' ${clearCache}"
		?${BTN_LABEL}=this,
Speed:
	TXT:NUM=
		?1..100?1,
Pitch:
	TXT:NUM=
		?1..100?1,
onTrack:
	CB=
		ON?OFF,
onEnglish:
	CB=
		OFF?ON,
INSTALL:
	BTN:HL=
		${BTN_CMD}="jsf '${0}' ${installMode}"
		?${BTN_LABEL}=this,
ocrLang:
	CB=
		en?jpn,
