
SETTING
	:BTN:HL=
		${BTN_CMD}=jsf `${japanRouteSearcherSettingJsPath}`
			?${BTN_LABEL}=this,

japanRouteSearcherBookmarkName
	:LBL:TXT:FGB=
		${TXT_LABEL}="Bookmark name"
	|
		${FCB_DIR_PATH}=`${japanRouteSearcherEditDirPath}`
			?${FCB_PREFIX}=`${ROUTE_PREFIX}`
			?${FCB_SUFFIX}=`${TSV_SUFFIX}`,

EDIT_FANNEL_STORE_BOOKMARK_NAME
	:BTN:HL=
		${BTN_CMD}=jsf `${japanRouteSearcherEditBookmarkJsPath}`
			?${BTN_LABEL}="BOOKMARK MANAGER",


