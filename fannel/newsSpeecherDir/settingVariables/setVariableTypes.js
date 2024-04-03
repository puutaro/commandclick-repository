

SPEECH_MODE:
	LBL:CB=
		${TXT_LABEL}=THIS
		|
			shuffle?ordinaly?reverse,

EACH_NUM:
	LBL:TXT:NUM=
		${TXT_LABEL}=THIS
		|
			?5..50?1,

Summary:
	BTN:HL=
		${BTN_CMD}=::TermLong::jsf '${0}' ${SUMMARY_MODE}
			?${BTN_LABEL}=this,

RE_SUMMARY:
	BTN:HL=
		${BTN_CMD}=::TermLong::jsf '${0}' ${RE_SUMMARY_MODE}
			?${BTN_LABEL}=this,

STOP:
	BTN:HL=
		${BTN_CMD}=jsf '${0}' ${STOP_MODE}
			?${BTN_LABEL}=this,

SETTING:
	BTN:HL=
		${BTN_CMD}=jsf '${0}' ${SETTIN_MODE}
			?${BTN_LABEL}=this,

newsUrlListName:
	LBL:TXT:FGB=
		${TXT_LABEL}=this
		|
			${FCB_DIR_PATH}=${NEWS_SPEECHER_EDIT_DIR_PATH}
				?${FCB_PREFIX}=${NEWS_SPEECHER_PREFIX}
				?${FCB_SUFFIX}=${TSV_EXTEND},

EDIT_NEWS_URL_LIST_NAME:
	BTN:HL=
		${BTN_CMD}=jsf '${0}' ${EDIT_NEWS_URL_LIST_NAME_MODE}
			?${BTN_LABEL}=EDIT NEWS URL LIST,

Install:
	BTN:HL=
		${BTN_CMD}=jsf '${0}' ${INSTALL_MODE}
			?${BTN_LABEL}=this,


// TO_LANG:
// 	// CB=
// 	// 	-?ja?en?zh?es?ko,