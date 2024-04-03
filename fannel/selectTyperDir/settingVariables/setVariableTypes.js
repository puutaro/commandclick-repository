
firstButtons:
	BTN:BTN:BTN:BTN:HL=
		${BTN_CMD}=jsf '${selectTyperBackJsPath}'
			?${BTN_LABEL}=BACK
			?${IS_CONSEC}=true
		|
			${BTN_CMD}=jsf '${selectTyperNextJsPath}'
				?${BTN_LABEL}=NEXT
				?${IS_CONSEC}=true
		|
			${BTN_CMD}=jsf '${selectTyperPasteJsPath}'
				?${BTN_LABEL}=PST
				?${DISABLE_KEYBOARD_HIDDEN}=true
		|
			${BTN_CMD}=jsf '${selectTyperDeleteJsPath}'
				?${BTN_LABEL}=DEL
				?${DISABLE_KEYBOARD_HIDDEN}=true,

secondButtons:
	BTN:BTN:HL=
		${BTN_CMD}=jsf '${selectTyperEnterJsPath}'
			?${BTN_LABEL}=ENTER
		|
			${BTN_CMD}=jsf '${selectTyperTermInputJsPath}'
				?${BTN_LABEL}=INPUT,

valueList:
	LBL:TXT:ELSB:BTN=
		${TXT_LABEL}=this
		|
			${LIST_PATH}=${selectTyperSelectValueListTxtPath}
				?${LIMIT_NUM}=50
				?${SELECT_JS_PATH}="${selectTyperSelectValueScriptPath}"
		|
			${BTN_CMD}=jsf '${selectTyperRegisterValueJsPath}'
				?${BTN_LABEL}=RG,
