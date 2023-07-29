

/// LABELING_SECTION_START
// web search by list @puutaro
// 	* SEARCH_PREFIX 
// 		-> search target site url
//		ex) https://www.google.com/search?q=
// --
// --
// bellow setting variable main line up
// * terminalSizeType is cmdclick terminal size option
//  - OFF: no adjust (default)
//  - LONG: LongSize
//  - SHORT: ShortSize
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="OFF"
terminalSizeType="LONG"
scriptFileName="listSearcher.js"
hideSettingVariables="editExecute"
hideSettingVariables="terminalSizeType"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
/// CMD_VARIABLE_SECTION_END



/// Please write bellow with shell script


const BTN_CMD = "cmd";
const BTN_LABEL = "label";
const LIST_PATH = "listPath";
const LIMIT_NUM = "limitNum";
const TXT_MARK = "TXT";
const ELSB_MARK = "ELSB";
const SEARCH_PREFIX_VAL = "searchPrefix";
const SEARCH_TEXT_VAL="searchText";
const searchTextSaveLimit = 20;
const searchPrefixSaveLimit = 20;


const FANNEL_DIR_PATH = "${01}/${001}";
jsFileSystem.createDir(
	FANNEL_DIR_PATH
);
const LIST_DIR_PATH = `${FANNEL_DIR_PATH}/list`;
jsFileSystem.createDir(
	LIST_DIR_PATH
);
const SEARCH_TEXT_LIST_FILE = `${LIST_DIR_PATH}/searchTextList.txt`;
const SEARCH_PREFIX_LIST_FILE = `${LIST_DIR_PATH}/searchPrefixList.txt`;
const GGLE_URL = "https://www.google.com/search?q=";

let searchTextAndPrefixPair = 
	makeSearchTextAndPrefixPairByForm();
if(
	!searchTextAndPrefixPair
) exitZero();
registerSearchTextAndPrefix(
	searchTextAndPrefixPair
);
execSearch(
	searchTextAndPrefixPair
);

function makeSearchTextAndPrefixPairByForm(){
	const defaultSearchText = jsFileSystem.readLocalFile(
		SEARCH_TEXT_LIST_FILE
	).split("\n").at(0);
	var defaultSearchPrefix = jsFileSystem.readLocalFile(
		SEARCH_PREFIX_LIST_FILE
	).split("\n").at(0);

	if(
		!defaultSearchPrefix
	) defaultSearchPrefix = GGLE_URL;
	const setVariableSearchText = `${SEARCH_TEXT_VAL}:${TXT_MARK}:${ELSB_MARK}=${LIST_PATH}=${SEARCH_TEXT_LIST_FILE}!${LIMIT_NUM}=${searchTextSaveLimit}`;
	const setVariableSearchPrefix = `${SEARCH_PREFIX_VAL}:${TXT_MARK}:${ELSB_MARK}=${LIST_PATH}=${SEARCH_PREFIX_LIST_FILE}!${LIMIT_NUM}=${searchPrefixSaveLimit}`;
	const searchCmdVal = `${SEARCH_TEXT_VAL}=${defaultSearchText}`;
	const searchPrefixCmdVal = `${SEARCH_PREFIX_VAL}=${defaultSearchPrefix}`;
	return jsDialog.formDialog(
		`select bellow`,
		`${setVariableSearchText}\t${setVariableSearchPrefix}`,
		`${searchCmdVal}\t${searchPrefixCmdVal}`,
	).split("\n").map(
		function(query){
			let queryList = query.split("=");
			if(queryList < 2) return "";
			return queryList
				.slice(1)
				.join("=")
				.trim()
				.replaceAll("\"", "");
	});
};

function registerSearchTextAndPrefix(
	searchTextAndPrefixPair
){
	const returnSearchText = searchTextAndPrefixPair[0];
	const returnSearchPrefix = searchTextAndPrefixPair[1];
	if(returnSearchText){
		jsListSelect.updateListFileCon(
			SEARCH_TEXT_LIST_FILE,
			returnSearchText
		);
	};
	if(returnSearchPrefix){
		jsListSelect.updateListFileCon(
			SEARCH_PREFIX_LIST_FILE,
			returnSearchPrefix
		);
	};
};

function execSearch(
	searchTextAndPrefixPair
){
	const returnSearchText = searchTextAndPrefixPair[0];
	if(!returnSearchText) return;
	const returnSearchPrefix = searchTextAndPrefixPair[1];
	if(!returnSearchPrefix) return;
	const searchUrl = `${returnSearchPrefix}${returnSearchText}`;
	location.href = searchUrl;
};
