// basic
TXT_LABEL=label,
BTN_CMD=cmd,
BTN_LABEL=label,
IS_CONSEC=isConsec,
DISABLE_KEYBOARD_HIDDEN=disableKeyboardHidden,
LIST_PATH=listPath,
LIMIT_NUM=limitNum,
INIT_MARK=initMark,
INIT_VALUE=initValue,
SELECT_JS_PATH=selectJsPath,
FCB_DIR_PATH=dirPath,
FCB_PREFIX=prefix,
FCB_SUFFIX=suffix,
FCB_TYPE=type,
TYPE_STR=typeStr,


// variable
ROUTE_PREFIX=
	"route",
TSV_SUFFIX=
	".tsv",
japanRouteSearcherLaunchUrl=
	`https://world.jorudan.co.jp/mln/en/?sub_lang=`,
japanRouteSearcherBookmarkDefaultName=
	`${ROUTE_PREFIX}Bookmark.tsv`,

// dir path
currentAppDirPath=
	"${01}",
japanRouteSearcherDirPath=
	"${01}/${001}",
japanRouteSearcherJsDirPath=
	`${japanRouteSearcherDirPath}/js`,
japanRouteSearcherSystemJsDirPath=
	`${japanRouteSearcherDirPath}/systemJs`,
japanRouteSearcherLibsDirPath=
	`${japanRouteSearcherDirPath}/libs`,
japanRouteSearcherEditDirPath=
	`${japanRouteSearcherDirPath}/edit`,

// file path
japanRouteSearcherFannelPath=
	`${0}`,

// js path
japanRouteSearcherSettingJsPath=
	`${japanRouteSearcherJsDirPath}/setting.js`,
japanRouteSearcherEditBookmarkJsPath=
	`${japanRouteSearcherJsDirPath}/editBookmarkName.js`,
japanRouteSearcherBookmarksJsPath=
	`${japanRouteSearcherJsDirPath}/bookmarks.js`,
webSearcherFannelPath=
	`${currentAppDirPath}/webSearcher.js`,

// libs path
japanRouteSearcherUrlLauncherPath=
	`${japanRouteSearcherLibsDirPath}/launchJapanRouteSearchUrl.js`,
japanRouteSearcherMakeCreatorTsvPathForBookmarkListJsPath=
	`${japanRouteSearcherLibsDirPath}/makeCreatorJSPathForBookmarkList.js`,
japanRouteSearcherUpdateBookMarkNameJsPath=
	`${japanRouteSearcherLibsDirPath}/updateBookMarkName.js`,


// list path
APP_URL_HISTORY_PATH=
	`${currentAppDirPath}/system/url/cmdclickUrlHistory.tsv`,