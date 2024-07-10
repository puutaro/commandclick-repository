

name="Shortuct"
|icon=shortcut
|func=SHORTCUT
,

name="Setting tts"
|icon=setting
|acVar=runToConfigState
	?importPath=
		`${cmdTtsPlayerChangeStateAction}`
			?replace=
				STATE=`${CONFIG}`
				&ENABLE_ADD_TO_BACKSTACK=ON,