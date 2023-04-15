

/// LABELING_SECTION_START
// News site searcher @puutaro
// * WEB_SEARCH_PREFIX -> search target site url
//		ex) https://www.google.com/search?q=
// * REMOVE_WEB_SEARCH_PREFIX -> remove web search prefix from list
// * REMOVE_SEARCH_TEXT -> remove search text from list
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
terminalFontZoom="130"
setVariableType="WEB_SEARCH_PREFIX:LCB=${01}/cmdNewsSearcherDir/webSearchPrefixList"
setVariableType="REMOVE_WEB_SEARCH_PREFIX:LCBB=${01}/cmdNewsSearcherDir/webSearchPrefixList|jsf '${0}' remove_web_search_prefix"
setVariableType="SEARCH_TEXT:LCB=${01}/cmdNewsSearcherDir/searchList"
setVariableType="REMOVE_SEARCH_TEXT:LCBB=${01}/cmdNewsSearcherDir/searchList|jsf '${0}' remove_search_text"
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
const NEWS_APP_DIR_PATH = "${01}/cmdNewsSearcherDir";
const WEB_SEARCH_PREFIX_FILE_PATH = `${NEWS_APP_DIR_PATH}/webSearchPrefixList`;
const SEARCH_LIST_FILE_PATH = `${NEWS_APP_DIR_PATH}/searchList`;
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
			updateListFileCon(
				NEWS_APP_DIR_PATH,
				WEB_SEARCH_PREFIX_FILE_PATH,
				WEB_SEARCH_PREFIX
			);
			updateListFileCon(
				NEWS_APP_DIR_PATH,
				SEARCH_LIST_FILE_PATH,
				searchText
			);
			execNewsSearch(SEARCH_TEXT);
			break;
		case removeWebSearchPrefixArg:
			removeFromList(
				NEWS_APP_DIR_PATH,
				SEARCH_LIST_FILE_PATH,
				REMOVE_SEARCH_TEXT
			);
		case removeSearchTextArg:
			removeFromList(
				NEWS_APP_DIR_PATH,
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


function wrapExecNewsSearch(text){
	const searchText = text.trim();
	updateListFileCon(
		NEWS_APP_DIR_PATH,
		SEARCH_LIST_FILE_PATH,
		searchText
	);
	execNewsSearch(searchText);
};

function wrapExecNewsSearch(text){
	const searchText = text.trim();
	updateListFileCon(
		NEWS_APP_DIR_PATH,
		SEARCH_LIST_FILE_PATH,
		searchText
	);
	execNewsSearch(searchText);
};

function updateListFileCon(
	searchListDirPath,
	searchListFilePath,
	searchText
){
	jsFileSystem.createDir(
		searchListDirPath
	);
	let currentListCons = jsFileSystem.readLocalFile(
			searchListFilePath
		).split("\n");
	if(
		searchText === escapeCharHyphen
	) return;
	const inInclude = currentListCons.find(
		function(req){
			return req.trim() === searchText;
		}
	);
	if(inInclude) return;
	const updateListConSource = searchText + 
		"\n" + 
		jsFileSystem.readLocalFile(
			searchListFilePath
		);
	const updateListCon = updateListConSource
		.split("\n")
		.filter(
			function(req){
				const trimReq = req.trim();
				return trimReq !== "" 
					&& trimReq !== escapeCharHyphen;
			}
		).join("\n");
	jsFileSystem.writeLocalFile(
        searchListFilePath,
        updateListCon
	);
};

function removeFromList(
	searchListDirPath,
	searchListFilePath,
	searchText
){
	jsFileSystem.createDir(
		searchListDirPath
	);
	let currentListCons = jsFileSystem.readLocalFile(
			searchListFilePath
		).split("\n");
	const trimRequest = searchText.trim();
	if(
		trimRequest == escapeCharHyphen
	) {
		return;
	};
	const inInclude = currentListCons.find(
		function(req){
			return req.trim() === trimRequest;
		}
	);
	if(!inInclude) {
		jsToast.short(`no exist: ${searchText}`);
		return;
	};
	const updateListCon = jsFileSystem.readLocalFile(
		searchListFilePath
	)
		.split("\n")
		.filter(
			function(req){
				const trimReq = req.trim();
				return trimReq !== "" 
					&& trimReq !== escapeCharHyphen
					&& trimReq !== trimRequest;
			}
		).join("\n");
	jsFileSystem.writeLocalFile(
        searchListFilePath,
        updateListCon
	);
	jsIntent.launchShortcut(
        "${01}",
        "${02}"
    );
};
