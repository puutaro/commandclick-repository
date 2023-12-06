
sendkeys1
	:BTN:BTN:BTN:BTN:BTN:HL=
		${BTN_CMD}=jsf '${sshTerminalCopyJsPath}'
			!${BTN_LABEL}=CP
			!${DISABLE_KEYBOARD_HIDDEN}=true
		|
			${BTN_CMD}=jsf '${sshTerminalPasteJsPath}'
				!${BTN_LABEL}=PST
				!${DISABLE_KEYBOARD_HIDDEN}=true
		|
			${BTN_CMD}=jsf '${sshTerminalUpJsPath}'
				!${BTN_LABEL}=↑
				!${IS_CONSEC}=true
				!${DISABLE_KEYBOARD_HIDDEN}=true
		|
			${BTN_CMD}=jsf '${sshTerminalBackspaceJsPath}'
				!${BTN_LABEL}=BS
				!${IS_CONSEC}=true
				!${DISABLE_KEYBOARD_HIDDEN}=true
		|
			${BTN_CMD}=jsf '${sshTerminalPageUpJsPath}'
				!${BTN_LABEL}=P_U
				!${DISABLE_KEYBOARD_HIDDEN}=true,

sendkeys2
	:BTN:BTN:BTN:BTN:ELSB:HL=
		${BTN_CMD}=jsf '${sshTerminalSpaceJsPath}'
			!${BTN_LABEL}=SPC
		|
			${BTN_CMD}=jsf '${sshTerminalLeftJsPath}'
				!${BTN_LABEL}=←
				!${IS_CONSEC}=true
				!${DISABLE_KEYBOARD_HIDDEN}=true
		|
			${BTN_CMD}=jsf '${sshTerminalDownJsPath}'
				!${BTN_LABEL}=↓
				!${IS_CONSEC}=true
				!${DISABLE_KEYBOARD_HIDDEN}=true
		|
			${BTN_CMD}=jsf '${sshTerminalRightJsPath}'
				!${BTN_LABEL}=→
				!${IS_CONSEC}=true
				!${DISABLE_KEYBOARD_HIDDEN}=true
		|
		${LIST_PATH}=${sshTerminalExtraKeyListFilePath}
			!${LIMIT_NUM}=50
			!${SELECT_JS_PATH}="${sshTerminalSelectCmdScriptPath}",

sendkeys3
	:BTN:BTN:BTN:HL=
		${BTN_CMD}=jsf '${sshTerminalCtrlCJsPath}'
			!${BTN_LABEL}=C_C
			!${DISABLE_KEYBOARD_HIDDEN}=true
	|
		${BTN_CMD}=jsf '${sshTerminalEnterJsPath}'
			!${BTN_LABEL}=ENTER
	|
			${BTN_CMD}=jsf '${sshTerminalInputJsPath}'
				!${BTN_LABEL}=INPUT,

cmdInput
	:LBL:TXT:ELSB:BTN=
		${TXT_LABEL}=this
		|
			${LIST_PATH}=${sshTerminalCmdListFilePath}
				!${LIMIT_NUM}=50
				!${SELECT_JS_PATH}=`${sshTerminalSelectCmdScriptPath}`
		|
			${BTN_CMD}=jsf '${sshTerminalRegisterCmdJsPath}'
				!${BTN_LABEL}=RG,

REGISTER_EXTRA_KEY
	:TXT:BTN=
		${BTN_CMD}=jsf '${sshTerminalRegisterExtraKeyJsPath}'
			!${BTN_LABEL}=RG_EX_KEY,

SETTING
	:BTN:HL=
		${BTN_CMD}=jsf '${sshTerminalSettingJsPath}'
			!${BTN_LABEL}=this,
