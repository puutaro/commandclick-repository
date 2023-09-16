

/// LABELING_SECTION_START
// file://${01}/${001}/cmdNewsSearcher.md
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
onUrlHistoryRegister="ON"
onAdBlock="INHERIT"
historySwitch="ON"
terminalFontZoom="130"
execPlayBtnLongPress="PAGE_SEARCH"
execEditBtnLongPress="WEB_SEARCH"
srcImageAnchorLongPressMenuFilePath=""
homeScriptUrlsPath="${01}/${001}"
homeFannelsPath=""
noScrollSaveUrls="${01}/${001}/settings/noScrollSaveUrls.txt"
setReplaceVariables="file://${01}/${001}/settingVariables/setReplaceVariables.js"
setVariableTypes="file://${01}/${001}/settingVariables/setVariableTypes.js"
hideSettingVariables="file://${01}/${001}/settingVariables/hideSettingVariables.js"
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

