

/// LABELING_SECTION_START
// Bookmark fannel @puutaro
// 	* play 
// 		-> launch bookmark site
//		- recent visit site url show in "Save title"
//		- change item  order by drag and drop 
//		- delete item  by doragging to another area(no item area).
// 	* bookmarkName 
//		-> Input or select bookmark list file name
//		- prefix must be "book" ex) "bookSites"
// --
// --
// bellow setting variable main line up
// * EditExecute is edit mode change
//	- NO is normal edit
//	- ONCE is one time edit and execute
//	- ALWAYD is always edit and execute
// * onUpdateLastModify is how updating file last modified status when executing
//  - ON: update this (default)
//  - OFF: no update this
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="NO"
terminalSizeType="LONG"
onUpdateLastModify="ON"
setReplaceVariable="CMD_BOOKMAKER_DIR_PATH=${01}/cmdBookmakerDir"
setReplaceVariable="CMD_BOOKMAKER_EDIT_DIR_PATH=${CMD_BOOKMAKER_DIR_PATH}/edit"
setVariableType="bookmarkName:EFCB=${CMD_BOOKMAKER_EDIT_DIR_PATH}&book&NoExtend"
setVariableType=""
scriptFileName="cmdBookmaker.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
bookmarkName="bookSites"
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript


const CMD_BOOKMAKER_DIR_PATH = "${CMD_BOOKMAKER_DIR_PATH}";
const CMD_BOOKMAKER_EDIT_DIR_PATH = "${CMD_BOOKMAKER_EDIT_DIR_PATH}";
const EDIT_FILE_PATH = `${CMD_BOOKMAKER_EDIT_DIR_PATH}/${bookmarkName}`;
const APP_URL_HISTORY_PATH="${01}/system/url/cmdclickUrlHistory";


jsIntent.launchEditSite(
	EDIT_FILE_PATH,
	APP_URL_HISTORY_PATH,
	"true",
	"false",
	"true",
	"urlString.startsWith('http');"
);
