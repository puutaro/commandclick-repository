// basic
TXT_LABEL=label,
BTN_CMD=cmd,
BTN_LABEL=label,
IS_CONSEC=isConsec,
DISABLE_KEYBOARD_HIDDEN=disableKeyboardHidden,
LIST_PATH=listPath,
LIMIT_NUM=limitNum,
SELECT_JS_PATH=selectJsPath,


// dir path
currentAppDirPath=
	"${01}",
selectTyperDirPath=
	"${currentAppDirPath}/${001}",
selectTyperListDirPath=
	"${selectTyperDirPath}/list",
selectTyperSelectScriptDirPath=
	"${selectTyperDirPath}/select",
selectTyperTempDirPath=
	"${selectTyperDirPath}/temp",
selectTyperSystemJsDirPath=
	"${selectTyperDirPath}/systemJs",
selectTyperJsDirPath=
	"${selectTyperDirPath}/js",
selectTyperLibsDirPath=
	"${selectTyperDirPath}/libs",

// file path
fannelPath=
	"${0}",
fannelName=
	"${02}",
appHistoryTsvPath=
	"${currentAppDirPath}/system/url/cmdclickUrlHistory.tsv",
selectTyperSelectValueListTxtPath=
	"${selectTyperListDirPath}/selectValueList.txt",
selectTyperTempFirstTabTxtPath=
	"${selectTyperTempDirPath}/firstTab.txt",

// js file path
selectTyperBackJsPath=
	"${selectTyperJsDirPath}/back.js",
selectTyperNextJsPath=
	"${selectTyperJsDirPath}/next.js",
selectTyperPasteJsPath=
	"${selectTyperJsDirPath}/paste.js",
selectTyperDeleteJsPath=
	"${selectTyperJsDirPath}/delete.js",
selectTyperEnterJsPath=
	"${selectTyperJsDirPath}/enter.js",
selectTyperTermInputJsPath=
	"${selectTyperJsDirPath}/termInput.js",
selectTyperRegisterValueJsPath=
	"${selectTyperJsDirPath}/registerValue.js",
selectTyperOnAutoExecJsPath=
	"${selectTyperSystemJsDirPath}/onAutoExec.js",
selectTyperUrlHistoryClickJsPath=
	"${selectTyperSystemJsDirPath}/urlHistoryClick.js",
selectTyperSelectValueScriptPath=
	"${selectTyperSelectScriptDirPath}/selectValue.js",

// lib file
selectTyperDeactivateInputTextPath=
	"${selectTyperLibsDirPath}/deactivateInputText.js",
selectTyperUpdateSeachWordListJsPath=
	"${selectTyperLibsDirPath}/updateSeachWordList.js",
selectTyperSendTabKeyActionJsPath=
	"${selectTyperLibsDirPath}/sendTabKeyAction.js",
selectTyperGetRecentUrlFromHisConJsPath=
	"${selectTyperLibsDirPath}/getRecentUrlFromHisCon.js",
selectTyperSaveRecentUrlToHistoryPath=
	"${selectTyperLibsDirPath}/saveRecentUrlToHistory.js",
