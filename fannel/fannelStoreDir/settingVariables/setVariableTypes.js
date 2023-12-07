
SETTING
	:BTN:HL=
		${BTN_CMD}=jsf `${fannelStoreSettingJsPath}`
			!${BTN_LABEL}=this,

fannelStoreBookmarkName
	:LBL:TXT:FGB=
		${TXT_LABEL}="Bookmark name"
	|
		${FCB_DIR_PATH}=`${fannelStoreEditDirPath}`
			!${FCB_PREFIX}=`${FANNEL_STORE_PREFIX}`
			!${FCB_SUFFIX}=`${TSV_SUFFIX}`,

EDIT_FANNEL_STORE_BOOKMARK_NAME
	:BTN:HL=
		${BTN_CMD}=jsf `${fannelStoreEditBookmarkJsPath}`
			!${BTN_LABEL}="BOOKMARK MANAGER",


