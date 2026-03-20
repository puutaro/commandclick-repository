
---

frame=
	|sVar=SETTING_VALUE_LABEL_TAG
		?value=`{{ SETTING_VALUE_LABEL_TAG }}`
	|sVar=SETTING_VAL_NAME
		?value=`{{ SETTING_VAL_NAME }}`
	|sVar=EDIT_LABEL
		?value=`{{ EDIT_LABEL }}`
	|sVar=SETING_SELECT_LIST
		?value=`{{ SETING_SELECT_LIST }}`
	|sVar=LABEL_HORIZON_HEIGHT
		?value=`40`
	|sVar=VALUE_HORIZON_HEIGHT
		?value=`40`
	|sVar=BUTTOM_FONT_SIZE
		?=value=`50`
	|sVar=DEBUG_VALUE_BK_COLOR
		?value="lightBlue"
	|sVar=DEBUG_VALUE_FRAME_BK_COLOR
		?value="lightGreen"
	|sVar=VERTICAL_HEIGHT
		?func=culc.int
		?args=
			formula=`(${LABEL_HORIZON_HEIGHT} + ${VALUE_HORIZON_HEIGHT})`
	|sVar=ENABLE_VERTICAL2
		?value=`{{ ENABLE_VERTICAL2:OFF }}`
	|sVar=VERTICAL2_WEIGHT
		?sIf=`${ENABLE_VERTICAL2}`
		?args=
			baseRegex="^OFF$"
			&matchType=equal
		?onReturn="0"
		?onReturn="0.55"
	|sVar=VERTICAL1_WEIGHT
		?func=culc.float
		?args=
			formula=`1 - ${VERTICAL2_WEIGHT}`
	|tag={{ FRAME_TAG }}
	|height=`${VERTICAL_HEIGHT}`
	|onSave=OFF
	|onClick=`{{ ON_FRAME_CLICK }}`
	|var=runSpeechModeSetup
		?func=jsEdit.getSettingValue
		?args=
			settingValName=`${SETTING_VAL_NAME}`
			&srcFragment="edit"
		?func=jsDialog.list
		?args=
			fannelPath=`${FANNEL_PATH}`
			&title=`Edit ${EDIT_LABEL}`
			&listIconTsvCon=`${SETING_SELECT_LIST}`
			&promptConfigMapCon=`
				focusItemTitles=${it},
				searchVisible=OFF,
			`
		?if=`!it`
		?func=exitZero
		?func=jsEdit.updateTextViewAndFannel_S
		?args=
			indexOrParentTagName="${EDIT_LIST_POSITION}"
			&srcFragment="edit"
			&tagName=`${SETTING_VAL_NAME}`
			&updateText=`${it}`
			&overrideTextMapCon=""
			&textPropertyMapCon=``
			&isSave="NO_QUOTE:false"
	,
---


vertical=
	|tag=vertical1
	|height=`${VERTICAL_HEIGHT}`
	|weight=`${VERTICAL1_WEIGHT}`
	// |bkColor=orange
	,
---

horizon=
	|tag=`horizon_label1`
	|height=`${LABEL_HORIZON_HEIGHT}`
	|sVar=HORIZON_PADDING_VERTICAL
		?value=`10`
	// |bkColor="lightBlue"
	,
---

contents=
	|tag=`${SETTING_VALUE_LABEL_TAG}`
	|text=
		displayText=`${SRC_TITLE}`
	|textProperty=
		?width="MATCH"
		?height="WRAP"
		?gravity=start
		?size=`${linearFrameTextSize}`
		?strokeWidth=0
		?alpha=`${frameTextAlpha}`
		?style="bold"
	,
---

horizon=
	|tag=`LINEAR_SETTING_${SETTING_VAL_NAME}`
	|height=`${VALUE_HORIZON_HEIGHT}`
	|sVar=HORIZON_PADDING_VERTICAL
		?value=`7`
	// |bkColor="blue"
	,

----
contents=
	|tag=`${SETTING_VAL_NAME}`
	|height="MATCH"
	|layoutGravity=center
	|text=
		displayText=`${SRC_STR}`
		?srcStr=`${SETTING_VALUE}`
	|textProperty=
		?width="MATCH"
		?height="WRAP"
		?gravity=start
		?color="lightGreen"
		?size=`${linearFrameValueTextSize}`
		?strokeWidth=0
		?alpha=`${frameTextAlpha}`
		?style="bold"
	,

---


vertical=
	|tag=vertical2
	|enable=`${ENABLE_VERTICAL2}`
	|height=`${VERTICAL_HEIGHT}`
	|weight=`${VERTICAL2_WEIGHT}`
	// |bkColor=red
	,
---

horizon=
	|tag=`horizon_label2`
	|enable=ON
	|height=`${LABEL_HORIZON_HEIGHT}`

---
horizon=
	|tag=`horizon_${SETTING_VALUE_LABEL_TAG}2`
	|height=`MATCH`
	// `${VALUE_HORIZON_HEIGHT}`
	|sVar=HORIZON_PADDING_VERTICAL
		?value=`10`
	,
---

contents=
	|tag=`plusButton`
	|height=`MATCH`
	|image=
		paths="plus"
	|imageProperty=
		?height=`MATCH`
		?width=`WRAP`
	|onConsec=ON
	|settingImport=
		?importPath=`${textToSpeechIncDecrementPath}`
		?replace=
			&DIFF_NUMBER=`{{ PLUS_NUMBER }}`
			&THRESHOLD_CONDITION=`{{ PLUS_THRESHOLD_CONDITION }}`.impEND
	// |text=
	// 	displayText=`＋`
	// |textProperty=
	// 	?style="bold"
	// 	?size=`${BUTTOM_FONT_SIZE}`
	,
	|tag=`minusButton`
	|height=`MATCH`
	|image=
		paths="minus"
	|imageProperty=
		?height=`MATCH`
		?width=`WRAP`
	|onConsec=ON
	|settingImport=
		?importPath=`${textToSpeechIncDecrementPath}`
		?replace=
			&DIFF_NUMBER=`{{ MINUS_NUMBER }}`
			&THRESHOLD_CONDITION=`{{ MINUS_THRESHOLD_CONDITION }}`.impEND
	,
	|tag=`initButton`
	|height=`MATCH`
	|image=
		paths="launch"
	|imageProperty=
		?height=`MATCH`
		?width=`WRAP`
	|text=
		displayText=`Init`
	|textProperty=
		?style="bold"
		?size=`${BUTTOM_FONT_SIZE}`
	|onConsec=ON
	|var=
		?func=jsEdit.updateTextViewAndFannel_S
		?args=
			indexOrParentTagName="${EDIT_LIST_POSITION}"
			&srcFragment="edit"
			&tagName=`${SETTING_VAL_NAME}`
			&updateText=`50`
			&overrideTextMapCon=""
			&textPropertyMapCon=``
			&isSave="NO_QUOTE:false"
	,
