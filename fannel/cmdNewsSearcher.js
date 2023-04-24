

/// LABELING_SECTION_START
// News site searcher @puutaro
// 	* WEB_SEARCH_PREFIX 
// 		-> search target site url
//		ex) https://www.google.com/search?q=
//	* REMOVE_WEB_SEARCH_PREFIX
// 		-> remove web search prefix from list
//	* REMOVE_SEARCH_TEXT
// 		-> remove search text from list
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
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
onUrlHistoryRegister="OFF"
onAdBlock="INHERIT"
terminalFontZoom="130"
setReplaceVariable="NEWS_APP_DIR_PATH=${01}/${001}"
setReplaceVariable="NEWS_APP_LIST_DIR_PATH=${NEWS_APP_DIR_PATH}/list"
setReplaceVariable="WEB_SEARCH_PREFIX_FILE_PATH=${NEWS_APP_LIST_DIR_PATH}/webSearchPrefixList"
setReplaceVariable="SEARCH_LIST_FILE_PATH=${NEWS_APP_LIST_DIR_PATH}/searchList"
setVariableType="WEB_SEARCH_PREFIX:ELCB=${WEB_SEARCH_PREFIX_FILE_PATH}&30"
setVariableType="REMOVE_WEB_SEARCH_PREFIX:ELCBB=${WEB_SEARCH_PREFIX_FILE_PATH}|jsf '${0}' remove_web_search_prefix"
setVariableType="SEARCH_TEXT:ELCB=${SEARCH_LIST_FILE_PATH}&30"
setVariableType="REMOVE_SEARCH_TEXT:ELCBB=${SEARCH_LIST_FILE_PATH}|jsf '${0}' remove_search_text"
scriptFileName="cmdNewsSearcher.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
WEB_SEARCH_PREFIX="https://www.google.com/search?q="
SEARCH_TEXT=""
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
const normalSearchArg = "";
const removeWebSearchPrefixArg = "remove_web_search_prefix";
const removeSearchTextArg = "remove_search_text";
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
			removeItemInListFileCon(
				WEB_SEARCH_PREFIX_FILE_PATH,
				WEB_SEARCH_PREFIX
			);
		case removeSearchTextArg:
			removeItemInListFileCon(
				SEARCH_LIST_FILE_PATH,
				REMOVE_SEARCH_TEXT
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


function removeItemInListFileCon(
	searchListFilePath,
	searchText
){
	jsListSelect.removeItemInListFileCon(
		searchListFilePath,
		searchText
	);
	jsIntent.launchShortcut(
        "${01}",
        "${02}"
    );
};
