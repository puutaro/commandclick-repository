
sendkeys1
	:BTN:BTN:BTN:BTN:BTN:HL=
		${BTN_CMD}=jsf '${0}' ${COPY} 
			!${BTN_LABEL}=CP
			!${IS_CONSEC}=true
			!${DISABLE_KEYBOARD_HIDDEN}=true
		|
			${BTN_CMD}=jsf '${0}' ${PASTE} 
				!${BTN_LABEL}=PST
				!${IS_CONSEC}=true
				!${DISABLE_KEYBOARD_HIDDEN}=true
		|
			${BTN_CMD}=jsf '${0}' ${UP} 
				!${BTN_LABEL}=↑
				!${IS_CONSEC}=true
				!${DISABLE_KEYBOARD_HIDDEN}=true
		|
			${BTN_CMD}=jsf '${0}' ${BACKSPACE} 
				!${BTN_LABEL}=BS
				!${IS_CONSEC}=true
				!${DISABLE_KEYBOARD_HIDDEN}=true
		|
			${BTN_CMD}=jsf '${0}' ${PAGE_UP} 
				!${BTN_LABEL}=P_U
				!${DISABLE_KEYBOARD_HIDDEN}=true,

sendkeys2
	:BTN:BTN:BTN:BTN:BTN:HL=
		${BTN_CMD}=jsf '${0}' ${SPACE}
			!${BTN_LABEL}=SPC
		| 
			${BTN_CMD}=jsf '${0}' ${LEFT} 
				!${BTN_LABEL}=←
				!${IS_CONSEC}=true
				!${DISABLE_KEYBOARD_HIDDEN}=true
		| 
			${BTN_CMD}=jsf '${0}' ${DOWN} 
				!${BTN_LABEL}=↓
				!${IS_CONSEC}=true
				!${DISABLE_KEYBOARD_HIDDEN}=true
		| 
			${BTN_CMD}=jsf '${0}' ${RIGHT} 
				!${BTN_LABEL}=→
				!${IS_CONSEC}=true
				!${DISABLE_KEYBOARD_HIDDEN}=true
		|
			${BTN_CMD}=jsf '${0}' ${PAGE_DOWN} 
				!${BTN_LABEL}=P_D
				!${DISABLE_KEYBOARD_HIDDEN}=true,


// ${BTN_CMD}=jsf '${0}' ${ESC} 
// 			!${BTN_LABEL}=ESC
// 			!${DISABLE_KEYBOARD_HIDDEN}=true
// 		|
			
// |
// 	${BTN_CMD}=jsf '${0}' ${HOME} 
// 		!${BTN_LABEL}=HM
// 		!${DISABLE_KEYBOARD_HIDDEN}=true	
// | 
// 	${BTN_CMD}=jsf '${0}' ${END} 
// 		!${BTN_LABEL}=END
// 		!${DISABLE_KEYBOARD_HIDDEN}=true
		


sendkeys3
	:BTN:BTN:ELSB:HL= 
		${BTN_CMD}=jsf '${0}' ${CTRL_C} 
			!${BTN_LABEL}=C_C
			!${DISABLE_KEYBOARD_HIDDEN}=true
	|	
		${BTN_CMD}=jsf '${0}' ${ENTER}
			!${BTN_LABEL}=ENTER
	|
		${LIST_PATH}=${cmdTerminalExtraKeyListFilePath}
			!${LIMIT_NUM}=100
			!${SELECT_JS_PATH}="${cmdTerminalSelectCmdScriptPath}",
			// !${DISABLE_KEYBOARD_HIDDEN}=true,
		// |
		// 	${BTN_CMD}=jsf '${0}' ${BACKSPACE}
		// 		!${BTN_LABEL}=BACKSPACE
		// 		!${IS_CONSEC}=true
		// 		!${DISABLE_KEYBOARD_HIDDEN}=true
		// |
		// 	${BTN_CMD}=jsf '${0}' ${COPY}
		// 		!${BTN_LABEL}=cp
		// 		!${DISABLE_KEYBOARD_HIDDEN}=true,

cmdInput
	:LBL:TXT:ELSB:BTN=
		${TXT_LABEL}=this
		|
			${LIST_PATH}=${cmdTerminalCmdListFilePath}
				!${LIMIT_NUM}=100
				!${SELECT_JS_PATH}="${cmdTerminalSelectCmdScriptPath}"
		|
			${BTN_CMD}=jsf '${0}' ${CMD_INPUT}
				!${BTN_LABEL}=RG,

REGISTER_EXTRA_KEY
	:TXT:BTN= 
		${BTN_CMD}=jsf '${0}' ${REGISTER_EXTRA_KEY}
			!${BTN_LABEL}=RG_EX_KEY,
