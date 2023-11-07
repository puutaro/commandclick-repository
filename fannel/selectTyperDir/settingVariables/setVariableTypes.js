
firstButtons:
	BTN:BTN:BTN:HL=
		${BTN_CMD}=jsf '${0}' ${BACK} 
			!${BTN_LABEL}=BACK
			!${DISABLE_KEYBOARD_HIDDEN}=true
		|
			${BTN_CMD}=jsf '${0}' ${NEXT} 
				!${BTN_LABEL}=NEXT
				!${DISABLE_KEYBOARD_HIDDEN}=true
		|
			${BTN_CMD}=jsf '${0}' ${BACKSPACE} 
				!${BTN_LABEL}=DEL
				// !${IS_CONSEC}=true
				!${DISABLE_KEYBOARD_HIDDEN}=true,

secondButtons:
	BTN:BTN:HL=
		${BTN_CMD}=jsf '${0}' ${ENTER}
			!${BTN_LABEL}=ENTER
		|
			${BTN_CMD}=jsf '${0}' ${INPUT}
				!${BTN_LABEL}=INPUT,

valueList:
	LBL:TXT:ELSB:BTN=
		${TXT_LABEL}=this
		|
			${LIST_PATH}=${selectTyperSelectValueListTxtPath}
				!${LIMIT_NUM}=50
				!${SELECT_JS_PATH}="${selectTyperSelectValueScriptPath}"
		|
			${BTN_CMD}=jsf '${0}' ${registerValueListMode}
				!${BTN_LABEL}=RG,
