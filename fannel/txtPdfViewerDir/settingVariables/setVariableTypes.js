
txtPdfPath:
	TXT:LBL:GB:FL=
		label=this
		|
			${LIST_PATH}="${txtPdfViewerTxtPdfListFilePath}"
			!${LIMIT_NUM}=10,
TTS_PLAY:
	BTN:HL=
		${BTN_CMD}="jsf '${0}' ${ttsPlayMode}"
		!${BTN_LABEL}=this,
CLEAR_CACHE:
	BTN:HL=
		${BTN_CMD}="jsf '${0}' ${clearCache}"
		!${BTN_LABEL}=this,
Speed:
	TXT:NUM=
		!1..100!1,
Pitch:
	TXT:NUM=
		!1..100!1,
onTrack:
	CB=
		ON!OFF,
toLang:
	CB=
		-!ja!en!zh!es!ko,
longPressMenuTtsSwitch:
	LBL:CB=
		${TXT_LABEL}=this
		|
			OFF!ON,