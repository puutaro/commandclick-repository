
---

settingImport=
	?importPath="${textToSpeechSettingTemplatePath}"
	?replace=
		&FRAME_TAG="speechModeFrame"
		&ON_FRAME_CLICK="ON"
		&SETTING_VAL_NAME="speechMode"
		&EDIT_LABEL="speech mode"
		&SETING_SELECT_LIST="All?Summary?Highlight?Clipboard"
		&SETTING_VALUE_LABEL_TAG="speechModeLabel".impEND

---

settingImport=
	?importPath="${textToSpeechSettingTemplatePath}"
	?replace=
		&FRAME_TAG="speedFrame"
		&ON_FRAME_CLICK="OFF"
		&SETTING_VAL_NAME="Speed"
		&SETTING_VALUE_LABEL_TAG="speedLabel"
		&ENABLE_VERTICAL2="ON"
		&PLUS_NUMBER="+ 1"
		&PLUS_THRESHOLD_CONDITION=`it < 100`
		&MINUS_NUMBER="- 1"
		&MINUS_THRESHOLD_CONDITION=`it > 0`.impEND

---

settingImport=
	?importPath="${textToSpeechSettingTemplatePath}"
	?replace=
		&FRAME_TAG="pitchFrame"
		&ON_FRAME_CLICK="OFF"
		&SETTING_VAL_NAME="Pitch"
		&SETTING_VALUE_LABEL_TAG="pitchLabel"
		&ENABLE_VERTICAL2="ON"
		&PLUS_NUMBER="+ 1"
		&PLUS_THRESHOLD_CONDITION=`it < 100`
		&MINUS_NUMBER="- 1"
		&MINUS_THRESHOLD_CONDITION=`it > 0`.impEND

---

settingImport=
	?importPath="${textToSpeechSettingTemplatePath}"
	?replace=
		&FRAME_TAG="toLangFrame"
		&ON_FRAME_CLICK="ON"
		&SETTING_VAL_NAME="toLang"
		&EDIT_LABEL="toLang"
		&SETING_SELECT_LIST="-?ja?en?zh?es?ko"
		&SETTING_VALUE_LABEL_TAG="toLangLabel".impEND





// frame=
// 	|sVar=FRAME_VAR
// 		?value="frame1"
// 	|tag=speechModeFrame
// 	|onSave=ON
// 	// |var=runToast
// 	// 	?func=jsToast.short
// 	// 	?args=
// 	// 		msg="aa"
// 	|var=runSpeechModeSetup
// 		?func=jsEdit.getSettingValue
// 		?args=
// 			settingValName="speechMode"
// 			&srcFragment="edit"
// 		?func=jsDialog.list
// 		?args=
// 			fannelPath=`${FANNEL_PATH}`
// 			&title="Edit speech mode"
// 			&listIconTsvCon="All?Summary?Highlight?Clipboard"
// 			&promptConfigMapCon=`
// 				focusItemTitles=${it},
// 				searchVisible=OFF,
// 			`
// 		?if=`!it`
// 		?func=exitZero
// 		?func=jsEdit.updateTextViewAndFannel_S
// 		?args=
// 			indexOrParentTagName="${EDIT_LIST_POSITION}"
// 			&srcFragment="edit"
// 			&tagName=`speechMode`
// 			&updateText=`${it}`
// 			&overrideTextMapCon=""
// 			&textPropertyMapCon=`
// 			// 	color=red
// 			// 	?font=serif
// 			`
// 			&isSave="NO_QUOTE:true"
// 		// |var=runToast
// 		// 	?func=jsToast.short
// 		// 	?args=
// 		// 		msg="${APP_DIR_PATH}"
//
// 		// ?value=`
// 		// 	red\n
// 		// 	lightBlue\n
// 		// 	oliveGreen\n
// 		// 	trans
// 		// `
// 		// ?func=jsText.random
// 		// ?args=
// 		// 	con=`${it}`
// 		// 	&separator="\n"
// 		// ?func=jsEdit.updateImageView_S
// 		// ?args=
// 		// 	indexOrParentTagName="${EDIT_LIST_POSITION}"
// 		// 	&srcFragment="edit"
// 		// 	&tagName="speechMode"
// 		// 	&imageMapCon=`
// 		// 		?paths=rect:icon`
// 		// 	&imagePropertyMapCon=`
// 		// 		color=${it}
// 		// 		?scale=fitXy
// 		// 		`
// 	,
// ---
//
//
// vertical=
// 	|sVar=VERTICAL_VAR
// 		?value=`vertical_${FRAME_VAR}`
// 	|tag=vertical1
// 	,
// ---
//
// horizon=
// 	// |tag=LINEAR_SETTING_speechModeLabel
// 	// |width=`WRAP`
// 	// ,
// 	|sVar=settingValue
// 		?func=edit.getSettingValue
// 		?args=
// 			&targetVariableName="speechMode"
// 			&srcFragment="edit"
// 	|runJudge=
// 		?sIf=`${settingValue}`
// 		?args=
// 			baseRegex="^$"
// 			&matchType=notEqual
// 		?func=exit.exit
// 	|sAcVar=runToast
// 		?sIf="aa"
// 		?args=
// 			baseRegex="^default$"
// 			&matchType=notEqual
// 		?importPath=`${textToSpeechSettingsDirPath}/toast.js`
// 		?replace=
// 			MESSAGE=`${settingValue}__${SRC_TITLE}__${VERTICAL_VAR}`
//
// 	|tag=speechModeLabel
// 	|text=
// 		displayText=`${SRC_TITLE}`
// 		// ?srcStr=`${SETTING_VALUE}`
// 	|textProperty=
// 		?size=`${linearFrameTextSize}`
// 		?strokeWidth=0
// 		?alpha=`${frameTextAlpha}`
// 		?width="MATCH"
// 		?height="MATCH"
// 		?gravity=start
// 		?paddingTop=10
// 		?paddingBottom=10
// 		?style="bold"
// 	// |image=
// 	// 	paths=rect:icon
// 	// |imageProperty=
// 	// 	color=`red`
// 	// 	?scale=`fitXy`
// 	,
// ---
//
// horizon=
// 	|tag=LINEAR_SETTING_speechMode
// 	|enable=ON
// 	// |height=`WRAP`
// 	,
// 	|tag=speechMode
// 	|text=
// 		displayText=`${SRC_STR}`
// 		?srcStr=`${SETTING_VALUE}`
// 	|settingImport=
// 		?importPath=`${textToSpeechSettingsDirPath}/extTxt.js`.impEND
// 	// |textProperty=
// 		// ?size=`${linearFrameValueTextSize}`
// 		// ?strokeWidth=0
// 		// ?alpha=`${frameTextAlpha}`
// 		// ?width="MATCH"
// 		// ?height="WRAP"
// 		// ?gravity=start
// 		?color="lightGreen"
// 		// ?bkColor="red"
// 		?paddingTop=7
// 		?paddingBottom=7
// 		?style="bold"
// 	// |height=`${linearFrameValueHeight}`
// 	// |width=`${linearFrameValueWidth}`
// 	// |weight=`1`
// 	,
//
// ---
//
// vertical=
// 	|sVar=VERTICAL_VAR
// 		?value=`vertical_${FRAME_VAR}`
// 	|tag=vertical2
// 	,
// ---
//
// horizon=
// 	// |tag=LINEAR_SETTING_speechModeButton
// 	// |height=`MATCH`
// 	// ,
// 	|tag=speechModeButton
// 	|text=
// 		displayText=`Button`
// 		?srcStr=`${SETTING_VALUE}`
// 	|textProperty=
// 		?size=`${linearFrameValueTextSize}`
// 		?strokeWidth=2
// 		// ?width="MATCH"
// 		// ?height="MATCH"
// 		?gravity=center
// 		?color="lightBlue"
// 		?paddingTop=7
// 		?paddingBottom=7
// 		?style="bold"
// 	|image=
// 		paths=setting
// 	|imageProperty=
// 		?scale=`fitCenter`
// 	// |height=`${linearFrameValueHeight}`
// 	// |width=`${linearFrameValueWidth}`
// 	// |weight=`1`
// 	|var=runToast
// 		?func=jsToast.short
// 		?args=
// 			msg="aaa"
// 		?value=`
// 			invisible\n
// 			visible
// 		`
// 		?func=jsText.random
// 		?args=
// 			con=`${it}`
// 			&separator="\n"
// 		// ?func=jsEdit.getSettingValue
// 		// ?args=
// 		// 	settingValName="speechMode"
// 		// 	&srcFragment="edit"
// 		?func=jsEdit.updateFrameLayout_S
// 		?args=
// 			indexOrParentTagName="${EDIT_LIST_POSITION}"
// 			&srcFragment="edit"
// 			&tagNameListCon=`
// 				speechMode
// 				&speechModeLabel`
// 			&frameKeyPairListCon=`
// 				visible=${it}
// 			`
// 		// ?func=jsEdit.updateTextViewAndFannel_S
// 		// ?args=
// 		// 	indexOrParentTagName="${EDIT_LIST_POSITION}"
// 		// 	&srcFragment="edit"
// 		// 	&tagNameListCon="
// 		// 		speechMode
// 		// 		&speechModeLabel
// 		// 	"
// 		// 	&updateText=``
// 		// 	&&overrideTextMap=`onUpdate=OFF`
// 		// 	&textPropertyMapCon="
// 		// 		visible=${it}
// 		// 	"
// 		// 	&isSave="NO_QUOTE:false"
// 		// ?func=jsEdit.updateImageView_S
// 		// ?args=
// 		// 	indexOrParentTagName="${EDIT_LIST_POSITION}"
// 		// 	&srcFragment="edit"
// 		// 	&tagName="speechMode"
// 		// 	&imageMapCon=`
// 		// 		// ?paths=rect:icon
// 		// 	`
// 		// 	&imagePropertyMapCon=`
// 		// 		visible=OFF
// 		// 		// ?scale=fitXy
// 		// 	`
//
// 	,
//
//
