

var=runMinus
	?func=jsEdit.getSettingValue
	?args=
		settingValName=`${SETTING_VAL_NAME}`
		&srcFragment="edit"
	?func=jsCulc.int
	?args=
		formula=`${it} {{ DIFF_NUMBER }}`
	?if=`{{ THRESHOLD_CONDITION }}`
	?func=jsEdit.updateTextViewAndFannel_S
	?args=
		indexOrParentTagName="${EDIT_LIST_POSITION}"
		&srcFragment="edit"
		&tagName=`${SETTING_VAL_NAME}`
		&updateText=`${it}`
		&overrideTextMapCon=""
		&textPropertyMapCon=``
		&isSave="NO_QUOTE:false"