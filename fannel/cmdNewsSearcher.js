

/// LABELING_SECTION_START
// News site searcher @puutaro
// 	* WEB_SEARCH_PREFIX 
// 		-> search target site url
//		ex) https://www.google.com/search?q=
//	* REMOVE_WEB_SEARCH_PREFIX
// 		-> remove web search prefix from list
//	* REMOVE_SEARCH_TEXT
// 		-> remove search text from list
//  * Long press play button
//   	-> apear page search bar
//  * Long press edit button
//   	-> apear web search bar
// --
// --
// bellow setting variable main line up
// * EditExecute is edit mode change
//	- NO is normal edit
//	- ONCE is one time edit and execute
//	- ALWAYD is always edit and execute
// * terminalSizeType is cmdclick terminal size option
//  - OFF: no adjust (default)
//  - LONG: LongSize
//  - SHORT: ShortSize
// * terminalFontZoom adjust terminal font size (percentage)
// * historySwitch: switch app history with url history
//  - ON: switch
//  - OFF: no switch
//  - INHERIT: inherit config setting (default)
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
onUrlHistoryRegister="OFF"
onAdBlock="INHERIT"
historySwitch="ON"
terminalFontZoom="130"
execPlayBtnLongPress="PAGE_SEARCH"
execEditBtnLongPress="WEB_SEARCH"
homeScriptUrl1=""
homeScriptUrl2=""
homeScriptUrl3=""
homeScriptUrl4=""
homeScriptUrl5=""
setReplaceVariable="BTN_CMD=cmd"
setReplaceVariable="BTN_LABEL=label"
setReplaceVariable="LIST_PATH=listPath"
setReplaceVariable="LIMIT_NUM=limitNum"
setReplaceVariable="NEWS_APP_DIR_PATH=${01}/${001}"
setReplaceVariable="NEWS_APP_LIST_DIR_PATH=${NEWS_APP_DIR_PATH}/list"
setReplaceVariable="WEB_SEARCH_PREFIX_FILE_PATH=${NEWS_APP_LIST_DIR_PATH}/webSearchPrefixList"
setReplaceVariable="GGLE_SEARCH_LIST_FILE_PATH=${NEWS_APP_LIST_DIR_PATH}/ggleSearchList"
setReplaceVariable="SEARCH_LIST_FILE_PATH=${NEWS_APP_LIST_DIR_PATH}/searchList"
setReplaceVariable="SEARCH_JS_DIR_PATH=${NEWS_APP_DIR_PATH}/js"
setReplaceVariable="CP_SEARCH_JS_PATH=${SEARCH_JS_DIR_PATH}/cpSearch.js"
setVariableType="WEB_SEARCH_PREFIX:ELCB=${LIST_PATH}=${WEB_SEARCH_PREFIX_FILE_PATH}!${limitNum}=30"
setVariableType="REMOVE_WEB_SEARCH_PREFIX:ELCBB=${LIST_PATH}=${WEB_SEARCH_PREFIX_FILE_PATH}|${BTN_CMD}=jsf '${0}' remove_web_search_prefix!${BTN_LABEL}=del"
setVariableType="SEARCH_TEXT:ELCB=${LIST_PATH}=${SEARCH_LIST_FILE_PATH}!${limitNum}=30"
setVariableType="REMOVE_SEARCH_TEXT:ELCBB=${LIST_PATH}=${SEARCH_LIST_FILE_PATH}|${BTN_CMD}=jsf '${0}' remove_search_text!${BTN_LABEL}=del"
setVariableType="GGLE_SEARCH_TEXT:ELCB=${LIST_PATH}=${GGLE_SEARCH_LIST_FILE_PATH}!${limitNum}=10"
setVariableType="GGLE_SEARCH:BTN=cmd=jsf '${0}' GGLE_SEARCH"
scriptFileName="cmdNewsSearcher.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
WEB_SEARCH_PREFIX="https://www.google.com/search?q="
SEARCH_TEXT=""
GGLE_SEARCH_TEXT=""
GGLE_SEARCH=""
REMOVE_SEARCH_TEXT=""
REMOVE_WEB_SEARCH_PREFIX=""
/// CMD_VARIABLE_SECTION_END



/// Please write bellow with shell script


let args = jsArgs.get().split("\t");
const firstArgs = args.at(0);
const NEWS_APP_DIR_PATH = "${NEWS_APP_DIR_PATH}";
const NEWS_APP_LIST_DIR_PATH = "${NEWS_APP_LIST_DIR_PATH}";
const WEB_SEARCH_PREFIX_FILE_PATH = "${WEB_SEARCH_PREFIX_FILE_PATH}";
const SEARCH_LIST_FILE_PATH = "${SEARCH_LIST_FILE_PATH}";
const GGLE_SEARCH_LIST_FILE_PATH = "${GGLE_SEARCH_LIST_FILE_PATH}";
const normalSearchArg = "";
const removeWebSearchPrefixArg = "remove_web_search_prefix";
const removeSearchTextArg = "remove_search_text";
const ggleSearchArgs = "GGLE_SEARCH";
const escapeCharHyphen = "-";

switchHandler();


function switchHandler(){
	switch(firstArgs){
		case normalSearchArg:
			const searchTextSource = SEARCH_TEXT;
			const searchText = searchTextSource.trim();
			jsListSelect.updateListFileCon(
				WEB_SEARCH_PREFIX_FILE_PATH,
				WEB_SEARCH_PREFIX
			);
			jsListSelect.updateListFileCon(
				SEARCH_LIST_FILE_PATH,
				searchText
			);
			execNewsSearch(SEARCH_TEXT);
			break;
		case removeWebSearchPrefixArg:
			jsListSelect.wrapRemoveItemInListFileCon(
				WEB_SEARCH_PREFIX_FILE_PATH,
				REMOVE_WEB_SEARCH_PREFIX,
				"${01}/${02}",
    			"WEB_SEARCH_PREFIX",
    			"REMOVE_WEB_SEARCH_PREFIX"
			);
			break;
		case removeSearchTextArg:
			jsListSelect.wrapRemoveItemInListFileCon(
				SEARCH_LIST_FILE_PATH,
				REMOVE_SEARCH_TEXT,
				"${01}/${02}",
				"SEARCH_TEXT",
    			"REMOVE_SEARCH_TEXT",
			);
			break;
		case ggleSearchArgs:
			jsListSelect.updateListFileCon(
				GGLE_SEARCH_LIST_FILE_PATH,
				GGLE_SEARCH_TEXT
			);
			jsUrl.loadUrl(
				`https://www.google.co.id/search?q=${GGLE_SEARCH_TEXT}`
			);
			break;
	};
};

function execNewsSearch(text){
	const searchText = text.trim();
	const searchUrl = `${WEB_SEARCH_PREFIX}${searchText}`;
	jsUrl.loadUrl(searchUrl);
};


function wrapExecNewsSearch(searchText){
	jsListSelect.updateListFileCon(
		SEARCH_LIST_FILE_PATH,
		searchText
	);
	execNewsSearch(searchText);
};

