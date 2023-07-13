

selectColmuns:
	LBL:TXT:LMSB:BTN=
		${TXT_LABEL}=this
		|
			${LIST_PATH}=${CURRENT_COLUMN_LIST_FILE_PATH}
		|
			${BTN_CMD}=jsf '${0}' selectColSync
				!${BTN_LABEL}=sync,
filters:
	LBL:TXT:ELSB:BTN=
		${TXT_LABEL}=this
		|
			${LIST_PATH}=${CURRENT_FILTERS_LIST_FILE_PATH}
				!${LIMIT_NUM}=10
		|
			${BTN_CMD}=jsf '${0}' filters
				!${BTN_LABEL}=set,
startColNum:
	LBL:TXT:NUM:BTN=
		${TXT_LABEL}=this
		|
			!0..10000!1
		|
			${BTN_CMD}=jsf '${0}' initStartColNum
				!${BTN_LABEL}=to0,
startRowNum:
	LBL:TXT:NUM:BTN=
		${TXT_LABEL}=this
		|
			!0..10000!1
		|
			${BTN_CMD}=jsf '${0}' initStartRowNum
				!${BTN_LABEL}=to0,
scrollBoost:
	LBL:TXT:NUM:BTN=
		${TXT_LABEL}=this
		|
			!0..100000!1
		|
			${BTN_CMD}=jsf '${0}' initScrollBoost
				!${BTN_LABEL}=to0,
colRange:
	LBL:TXT:NUM:BTN=
		${TXT_LABEL}=this
		|
			!0..10000!1
		|
			${BTN_CMD}=jsf '${0}' initColRange
				!${BTN_LABEL}=to0,
rowRange:
	LBL:TXT:NUM:BTN=
		${TXT_LABEL}=this
		|
			!0..10000!1
		|
			${BTN_CMD}=jsf '${0}' initRowRange
				!${BTN_LABEL}=to0,
rowLimit:
	LBL:TXT:NUM:BTN=
		${TXT_LABEL}=this
		|
			!0..10000!100
		|
			${BTN_CMD}=jsf '${0}' initRowLimit
				!${BTN_LABEL}=to0,
autoScrollType:
	LBL:CB=
		${TXT_LABEL}=this
		|
			no!horizon!rHorizon!vartical!rVartical,
inputCTsvPath:
	LBL:TXT:GB:FL=
		${TXT_LABEL}=this
		|
			${LIST_PATH}=${CURRENT_INUPT_CSV_LIST_FILE_PATH}
				!${LIMIT_NUM}=10,
viewType:
	LBL:CB=
		${TXT_LABEL}=this
		|
			SRC!AGGRE!CHART,
