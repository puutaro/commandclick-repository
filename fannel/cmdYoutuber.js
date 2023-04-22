

/// LABELING_SECTION_START
// youtube background play fannel @puutaro
// 	* install 
// 		-> install require package
// 	* play 
// 		-> youtube play list edit site
//		- recent visit youtube url show in "Save title"
//		- change item  order by drag and drop 
//		- delete item  by doragging to another area(no item area).
// 	* tubePlayListName 
//		-> Input or select play list file name
//		- prefix must be "tube" ex) "tubePlayList"
//  * searchWord
// 		-> Web Youtube Search Word
// 	* tubePlay 
//		-> select shuffle or ordinaly and press
//		- press "Exec" and execute play list
//	If volume control enable when CommandClick hide
// 	* STOP
//		-> play stop (recommend: notification bar swip out)
// 	* numberPlay 
//		-> Input or inc/dec number
//		- press "Exec" and play number
//  * onWebSearch 
// 		-> web search switch
// 		- OFF -> no web search
// 		- SHORT -> sort by shortest
// 		- RECENT -> sort by latest
// --
// --
// bellow setting variable main line up
// * terminalSizeType is cmdclick terminal size option
//  - OFF: no adjust (default)
//  - LONG: LongSize
//  - SHORT: ShortSize
// * terminalOutputMode decide output mode in cmdclick terminal
//  - NORMAL: normal terminal output (default)
//  - REFLASH: Before terminal output, screen resflesh
//  - REFLASH_AND_FIRST_ROW: Before terminal output, screen resflesh and focus first row
//  - DEBUG: stdr + stderr
//  - NO: no output (bacground exec)
// * onUpdateLastModify is how updating file last modified status when executing
//  - ON: update this (default)
//  - OFF: no update this
// * onAdBlock: adblock switch
//  - INHERIT: inherit config setting
//  - ON: on
//  - OFF: off
// * terminalFontZoom adjust terminal font size (percentage)
// * terminalFontColor adjust terminal font color
// * terminalColor adjust terminal background color
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
terminalOutputMode="NORMAL"
onUpdateLastModify="ON"
terminalFontZoom="0"
terminalColor=""
terminalFontColor=""
setReplaceVariable="cmdTubePlayerDirPath=${01}/cmdYoutuberDir"
setReplaceVariable="cmdTubePlayerEditDirPath=${cmdTubePlayerDirPath}/edit"
setReplaceVariable="cmdTubePlayerListDirPath=${cmdTubePlayerDirPath}/list"
setReplaceVariable="cmdTubePlayerListFilePath=${cmdTubePlayerListDirPath}/searchWordList"
setVariableType="tubePlayListName:EFCB=${cmdTubePlayerEditDirPath}&tube&NoExtend"
setVariableType="tubePlay:CBB=shuffle!ordinaly!reverse|::TermOut::jsf '${0}'"
setVariableType="searchWord:ELCB=${cmdTubePlayerListFilePath}&20"
setVariableType="numberPlay:NUMB=!1..1000!1|::TermOut::jsf '${0}' number"
setVariableType="STOP:BTN=pkill -9 mpv"
setVariableType="Install:BTN=jsf '${0}'"
setVariableType="onWebSearch:CB=OFF!SHORT!RECENT"
setVariableType="deleteTubePlayList:EFCBB=${cmdTubePlayerEditDirPath}&tube&NoExtend|jsf '${0}' delete"
scriptFileName="cmdYoutuber.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
tubePlayListName="tubePlayList"
tubePlay="shuffle"
searchWord=""
STOP=""
numberPlay="3"
onWebSearch="OFF"
deleteTubePlayList=""
Install="install"
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript


let args = jsArgs.get().split("\t");
const DEFAULT_TERM_OUTPUT = "NORMAL";
const FIRST_ARGS = args.at(0);
searchWord = searchWord.trim();
const cmdTubePlayerDirPath = "${cmdTubePlayerDirPath}";
const cmdTubePlayerEditDirPath = "${cmdTubePlayerEditDirPath}";
const cmdTubePlayerShellDirPath = `${cmdTubePlayerDirPath}/shell`;
const EXEC_SHELL_PATH = `${cmdTubePlayerShellDirPath}/cmdYoutuber.sh`;
const EXEC_YTFZF_PATH = `${cmdTubePlayerShellDirPath}/ytfzfForFannel.sh`;
const cmdTubePlayerTmpDirPath = `${cmdTubePlayerDirPath}/temp`;
const cmdTubePlayerSearchWordFilePath = `${cmdTubePlayerTmpDirPath}/searchWord`;
const cmdTubePlayerListDirPath = "${cmdTubePlayerListDirPath}";
const cmdTubePlayerListFilePath = "${cmdTubePlayerListFilePath}";
const TUBE_PREFIX = "tube";
const webPlayListName = "webSearchPlayList";
if(onWebSearch != "OFF"){
	tubePlayListName = "webSearchPlayList"
};
const EDIT_FILE_PATH = makeCreatorJSPath(tubePlayListName);
const APP_URL_HISTORY_PATH="${01}/system/url/cmdclickUrlHistory";
const INSTALL_MODE = "install";
const SHUFFLE_MODE = "shuffle";
const ORDINALY_MODE = "ordinaly";
const NUMBER_MODE = "number";
const DELETE_MODE = "delete";
const REVERSE_MODE = "reverse";
const EDIT_SITE_WEB_MODE = "edit_site_web";
const ENABLE_UPDATE_WEB_SEARCH_LIST = judgeUpdateWebSearchList();
const WEB_SEARCH_ARGS = `${onWebSearch}\t${searchWord}\t${ENABLE_UPDATE_WEB_SEARCH_LIST}`;


argSwitcher();


function argSwitcher() {
	tubeListNameCheck(
		tubePlayListName
	);
	jsFileSystem.createDir(
		cmdTubePlayerTmpDirPath
	);
	registerWebSearchWord();
	updateSeachWordList();
	switch(FIRST_ARGS){
		case "":
			editSiteHandler();
			break;
		case INSTALL_MODE:
			cmdIntent.run(
				"bash " + ` \"${EXEC_SHELL_PATH}\"` + 
				` \"${INSTALL_MODE}\"`
			);
			break;
		case SHUFFLE_MODE: 
			cmdIntent.run(
				"bash " + ` \"${EXEC_SHELL_PATH}\"` + 
				` \"${SHUFFLE_MODE}\"` +
				` \"${EDIT_FILE_PATH}\"` + 
				` \"${WEB_SEARCH_ARGS}\"`
			);
			break;
		case ORDINALY_MODE:
			cmdIntent.run(
				"bash " + ` \"${EXEC_SHELL_PATH}\"` + 
				` \"${ORDINALY_MODE}\"` + 
				` \"${EDIT_FILE_PATH}\"` + 
				` \"${WEB_SEARCH_ARGS}\"`
			);
			break;
		case REVERSE_MODE:
			cmdIntent.run(
				"bash " + ` \"${EXEC_SHELL_PATH}\"` + 
				` \"${REVERSE_MODE}\"` + 
				` \"${EDIT_FILE_PATH}\"` +
				` \"${WEB_SEARCH_ARGS}\"`
			);
			break;
		case NUMBER_MODE:
			cmdIntent.run(
				"bash " + ` \"${EXEC_SHELL_PATH}\"` + 
				` \"${NUMBER_MODE}\"` + 
				` \"${EDIT_FILE_PATH}\"` + 
				` \"${WEB_SEARCH_ARGS}\"` + 
				` \"${numberPlay}\"`
			);
			break;
		case DELETE_MODE:
			execDeleteTubePlayList();
			break;
	};
};

function editSiteHandler(){
	if(onWebSearch == "OFF"){
		jsIntent.launchEditSite(
			EDIT_FILE_PATH,
			APP_URL_HISTORY_PATH,
			"false",
			"true",
			"true",
			"urlString.startsWith('http') && urlString.includes(\"youtube\");"
		);
		return;
	};
	if(!ENABLE_UPDATE_WEB_SEARCH_LIST){
		jsIntent.launchEditSite(
			EDIT_FILE_PATH,
			"",
			"false",
			"true",
			"true",
			"true"
		);
		return;
	};
	jsToast.short("start..");
	cmdIntent.run(
		"bash " + ` \"${EXEC_SHELL_PATH}\"` + 
		` \"${EDIT_SITE_WEB_MODE}\"` + 
		` \"${EDIT_FILE_PATH}\"` + 
		` \"${WEB_SEARCH_ARGS}\"`
	);
};

function makeCreatorJSPath(tubePlayListName){
	if(!tubePlayListName){
		alert("tubePlayListName must be written");
		throw new Error('exit');
		exitZero();
	};
	if(!tubePlayListName.startsWith(TUBE_PREFIX)){
		tubePlayListName = TUBE_PREFIX + tubePlayListName;
	};
	return [cmdTubePlayerEditDirPath, tubePlayListName].join('/');
};

function execDeleteTubePlayList(){
	jsFileSystem.jsEcho(
		terminalOutputMode,
		`remove: ${EDIT_FILE_PATH}`
	);
	jsFileSystem.removeFile(
		EDIT_FILE_PATH
	);
};


function updateSeachWordList(){
	if(onWebSearch == "OFF") return
	jsFileSystem.createDir(
		cmdTubePlayerListDirPath
	);
	jsListSelect.updateListFileCon(
		cmdTubePlayerListFilePath,
		searchWord
	);
};


function judgeUpdateWebSearchList(){
	if(
		onWebSearch == "OFF"
	) return false;
	if(
		!searchWord
	) return false;
	const pastSearchWord = jsFileSystem.readLocalFile(
		cmdTubePlayerSearchWordFilePath
	).trim();
	if(
		pastSearchWord == `${searchWord}\t${onWebSearch}`
	) return false;
	return true;
};

function registerWebSearchWord(){
	if(
		!ENABLE_UPDATE_WEB_SEARCH_LIST
	) return;
	jsFileSystem.writeLocalFile(
  		cmdTubePlayerSearchWordFilePath,
		`${searchWord}\t${onWebSearch}`
  	);
};


function tubeListNameCheck(
	tubePlayListName
){
	if(
		onWebSearch != "OFF"
	) return;
	if(tubePlayListName == webPlayListName){
		alert(`tubePlayListName must not be "${webPlayListName}"`);
		throw new Error('exit');
		exitZero();
	};
	if(tubePlayListName == `${TUBE_PREFIX}${webPlayListName}`){
		alert(`tubePlayListName must not be "${TUBE_PREFIX}${webPlayListName}"`);
		throw new Error('exit');
		exitZero();
	};
};
