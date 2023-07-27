

/// LABELING_SECTION_START
// Bookmark fannel @puutaro
// 	* play 
// 		-> launch bookmark site
//		- recent visit site url show in "Save title"
//		- change item  order by drag and drop 
//		- delete item  by doragging to another area(no item area).
// 	* bookmarkListName 
//		-> Input or select bookmark list file name
//		- prefix must be "book" ex) "bookSites"
// --
// --
// bellow setting variable main line up
// * EditExecute is edit mode change
//	- NO is normal edit
//	- ONCE is one time edit and execute
//	- ALWAYD is always edit and execute
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
onUpdateLastModify="ON"
onAdBlock="OFF"
setReplaceVariables="file://${01}/${001}/settingVariables/setReplaceVariables.js"
setVariableTypes="file://${01}/${001}/settingVariables/setVariableTypes.js"
hideSettingVariables="file://${01}/${001}/settingVariables/hideSettingVariables.js"
scriptFileName="cmdBookmaker.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
bookmarkListName="bookSites.tsv"
EDIT_BOOKMARK_NAME=""
ON_DIALOG="false"
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript


const CMD_BOOKMAKER_DIR_PATH = "${CMD_BOOKMAKER_DIR_PATH}";
const CMD_BOOKMAKER_EDIT_DIR_PATH = "${CMD_BOOKMAKER_EDIT_DIR_PATH}";
const EDIT_FILE_PATH = `${CMD_BOOKMAKER_EDIT_DIR_PATH}/${bookmarkListName}`;
const APP_URL_HISTORY_PATH = "${01}/system/url/cmdclickUrlHistory.tsv";
const EDIT_BOOKMARK_NAME_MODE = "EDIT_BOOKMARK_NAME";
const TsvExtend = ".tsv";
const BOOK_PREFIX = "book";
let args = jsArgs.get().split("\t");
var FIRST_ARGS = args.at(0);


switchByArgs();


function switchByArgs(){
	makeCreatorTsvPath(
		CMD_BOOKMAKER_EDIT_DIR_PATH,
		bookmarkListName,
		BOOK_PREFIX,
		TsvExtend
	);
	switch(FIRST_ARGS){
		case "":
			jsIntent.launchEditSite(
				EDIT_FILE_PATH,
				APP_URL_HISTORY_PATH,
				"true",
				"true",
				"true",
				"urlString.startsWith('http');",
				ON_DIALOG
			);
			break;
		case EDIT_BOOKMARK_NAME_MODE:
			jsFileSelect.execEditTargetFileName(
		        "bookmarkListName",
				"renamebookmarkListName",
				CMD_BOOKMAKER_EDIT_DIR_PATH,
				`bookmarkListName:TXT:EFSB=${FCB_DIR_PATH}=${CMD_BOOKMAKER_EDIT_DIR_PATH}!${FCB_PREFIX}=${BOOK_PREFIX}!${FCB_SUFFIX}=${TsvExtend}`,
				`bookmarkListName=${bookmarkListName}\trenamebookmarkListName=`,
				BOOK_PREFIX,
				TsvExtend,
		        "${01}/${02}",
		        "Edit bookmarkListName"
		    );
			break;
	};
};


function makeCreatorTsvPath(
	dirPath,
	bookmarkListName,
	prefix,
	suffix
){
	if(!bookmarkListName){
		alert("bookmarkListName must be written");
		throw new Error('exit');
		exitZero();
	};
	bookmarkListName = jsPath.compPrefix(
		bookmarkListName,
		prefix
	);
	bookmarkListName = jsPath.compExtend(
		bookmarkListName,
		suffix
	);
	return [dirPath, bookmarkListName].join('/');
};
