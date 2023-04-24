

/// LABELING_SECTION_START
// Youtube background play fannel @puutaro
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
// 	* playMode 
//		-> select shuffle or ordinaly and press
//		- press "Exec" and execute play list
//	If volume control enable when CommandClick hide
// 	* STOP
//		-> play stop (recommend: notification bar swip out)
// 	* numberPlay 
//		-> Input or inc/dec number
//		- press "Exec" and play number
//  * onSearchMode 
// 		-> web search switch
// 		- OFF -> no web search
// 		- SHORT -> sort by shortest
// 		- RECENT -> sort by latest
//  * playLogOut
// 		-> output play log
//  * minMinutes
// 		-> filter movie by minimum play minutes
//  * maxMinutes
// 		-> filter movie  by maximum play minutes
// - This Fannel is used to bellow repo as core library.
// 		https://github.com/pystardust/ytfzf
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
onUrlHistoryRegister="ON"
terminalFontZoom="0"
terminalColor=""
terminalFontColor=""
setReplaceVariable="cmdTubePlayerDirPath=${01}/${001}"
setReplaceVariable="cmdTubePlayerEditDirPath=${cmdTubePlayerDirPath}/edit"
setReplaceVariable="cmdTubePlayerListDirPath=${cmdTubePlayerDirPath}/list"
setReplaceVariable="cmdTubePlayerListFilePath=${cmdTubePlayerListDirPath}/searchWordList"
setReplaceVariable="PLAY_LOG_DIR_PATH=${cmdTubePlayerDirPath}/log"
setReplaceVariable="PLAY_LOG_FILE_PATH=${PLAY_LOG_DIR_PATH}/playLog"
setVariableType="searchWord:ELCB=${cmdTubePlayerListFilePath}&20"
setVariableType="playMode:CB=shuffle!ordinaly!reverse"
setVariableType="onSearchMode:CB=SHORT!RECENT!LOG_RND!LOG_FREQ!OFF"
setVariableType="PLAY:BTN=::TermOut::jsf '${0}'"
setVariableType="STOP:BTN=pkill -9 mpv"
setVariableType="numberPlay:NUMB=!1..1000!1|::TermOut::jsf '${0}' number"
setVariableType="minMinutes:NUM=!0..1000!1"
setVariableType="maxMinutes:NUM=!0..1000!1"
setVariableType="tubePlayListName:EFCB=${cmdTubePlayerEditDirPath}&tube&NoExtend"
setVariableType="deleteTubePlayList:EFCBB=${cmdTubePlayerEditDirPath}&tube&NoExtend|jsf '${0}' delete"
setVariableType="playLogOut:BTN=::TermOut::::TermLong::jsf '${0}' playLogOut"
setVariableType="Install:BTN=jsf '${0}'"
scriptFileName="cmdYoutuber.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
searchWord=""
playMode="shuffle"
onSearchMode="SHORT"
PLAY="tubePlay"
numberPlay="3"
STOP=""
minMinutes=0
maxMinutes=0
tubePlayListName="tubePlayList"
deleteTubePlayList=""
playLogOut=""
Install="install"
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript


let args = jsArgs.get().split("\t");
const DEFAULT_TERM_OUTPUT = "NORMAL";
var FIRST_ARGS = args.at(0);
if(FIRST_ARGS == PLAY){
	FIRST_ARGS = playMode;
};
searchWord = searchWord.trim();
const cmdTubePlayerDirPath = "${cmdTubePlayerDirPath}";
const PLAY_LOG_DIR_PATH = "${PLAY_LOG_DIR_PATH}";
const PLAY_LOG_FILE_PATH = "${PLAY_LOG_FILE_PATH}";
const cmdTubePlayerEditDirPath = "${cmdTubePlayerEditDirPath}";
const cmdTubePlayerShellDirPath = `${cmdTubePlayerDirPath}/shell`;
const EXEC_SHELL_PATH = `${cmdTubePlayerShellDirPath}/cmdYoutuber.sh`;
const EXEC_YTFZF_PATH = `${cmdTubePlayerShellDirPath}/ytfzfForFannel.sh`;
const cmdTubePlayerTmpDirPath = `${cmdTubePlayerDirPath}/temp`;
const cmdTubePlayerSearchWordFilePath = `${cmdTubePlayerTmpDirPath}/searchWord`;
const cmdTubePlayerListDirPath = "${cmdTubePlayerListDirPath}";
const cmdTubePlayerListFilePath = "${cmdTubePlayerListFilePath}";
const TUBE_PREFIX = "tube";
const searchPlayListName = "SearchPlayList";
const LOG_RUNDOM = "LOG_RND";
const LOG_FREQUENT = "LOG_FREQ";
let lOG_SEARCH_LIST = [LOG_RUNDOM, LOG_FREQUENT];
let noWebSearchModeList = ["OFF"].concat(lOG_SEARCH_LIST);
if(onSearchMode != "OFF"){
	tubePlayListName = searchPlayListName
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
const PLAY_LOG_MODE = "playLogOut";
const cURRENT_REGISTER_SEARCH_STRING = `${searchWord}\t${onSearchMode}\t${minMinutes},${maxMinutes}`;
const ENABLE_UPDATE_WEB_SEARCH_LIST = judgeUpdateWebSearchList();
const WEB_SEARCH_ARGS = `${onSearchMode}\t${searchWord}\t${ENABLE_UPDATE_WEB_SEARCH_LIST}\t${minMinutes},${maxMinutes}`;

argSwitcher();


function argSwitcher() {
	tubeListNameCheck(
		tubePlayListName
	);
	jsFileSystem.createDir(
		cmdTubePlayerTmpDirPath
	);
	jsFileSystem.createDir(
		PLAY_LOG_DIR_PATH
	);
	registerWebSearchWord();
	updateSeachWordList();
	logSearchHandler();
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
		case PLAY_LOG_MODE:
			catPlayLog();
	};
};

function editSiteHandler(){
	if(
		noWebSearchModeList.includes(onSearchMode)
	){
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
	if(
		onSearchMode == "OFF"
	) return
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
		onSearchMode == "OFF"
	) return false;
	if(
		!searchWord
		&& !lOG_SEARCH_LIST.includes(onSearchMode)
	) return false;
	const pastSearchWord = jsFileSystem.readLocalFile(
		cmdTubePlayerSearchWordFilePath
	).trim();
	if(
		pastSearchWord.trim() 
		== cURRENT_REGISTER_SEARCH_STRING.trim()
	) return false;
	return true;
};

function registerWebSearchWord(){
	if(
		!ENABLE_UPDATE_WEB_SEARCH_LIST
	) return;
	jsFileSystem.writeLocalFile(
  		cmdTubePlayerSearchWordFilePath,
		cURRENT_REGISTER_SEARCH_STRING
  	);
};


function tubeListNameCheck(
	tubePlayListName
){
	if(
		onSearchMode != "OFF"
	) return;
	if(tubePlayListName == searchPlayListName){
		alert(`tubePlayListName must not be "${searchPlayListName}"`);
		throw new Error('exit');
		exitZero();
	};
	if(tubePlayListName == `${TUBE_PREFIX}${searchPlayListName}`){
		alert(`tubePlayListName must not be "${TUBE_PREFIX}${searchPlayListName}"`);
		throw new Error('exit');
		exitZero();
	};
};

function catPlayLog(){
	const outputMode = "NORMAL";
	const grepPrefix = "Playing:";
	const datetimeRegex = new RegExp("^## [0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}"); 
	const playLogContents = jsFileSystem.readLocalFile(
		PLAY_LOG_FILE_PATH,
	).split("\n").filter(function(line){
		const existPrefixAndUrl = 
			line.includes(grepPrefix) 
				&& line.includes("http");
		return existPrefixAndUrl 
			|| line.match(datetimeRegex);
	}).map(function(line){
		if(
			line.match(datetimeRegex)
		) return line;
		const lineBody = line.replace(grepPrefix, "");
		return ` ${lineBody}`;
	}).join("\n").replaceAll(/\n\n*/g, "\n");
	jsFileSystem.fileEcho(
		scriptFileName,
		outputMode,
	);
	jsFileSystem.jsEcho(
		outputMode,
		playLogContents
	);
};


function logSearchHandler(){
	if(
		!ENABLE_UPDATE_WEB_SEARCH_LIST
	) return;
	if(
		!lOG_SEARCH_LIST.includes(onSearchMode)
	) return;
	const grepPrefix = "Playing:";
	const playListLengthLimit = 30;
	const playLogList = jsFileSystem.readLocalFile(
		PLAY_LOG_FILE_PATH,
	).split("\n").filter(function(line){
		return  line.includes(grepPrefix) 
			&& line.includes("http");
	}).map(function(line){
		const movieUrl = line.replace(grepPrefix, "").trim();
		return `${movieUrl}\t${movieUrl}`;
	});
	const playListLength = playLogList.length - 1;
	if(playListLength - playListLengthLimit > 0) {
		var sliceStartNum = playListLength - playListLengthLimit;
	} else if(playListLength <= 0) {
		editZero();
	} else {
		var sliceStartNum = 1;
	};
	switch(onSearchMode){
		case LOG_RUNDOM:
			var shuffflePlayLogContents = shuffleArray(
				playLogList
			).slice(sliceStartNum).join("\n");
			jsFileSystem.writeLocalFile(
				EDIT_FILE_PATH,
				shuffflePlayLogContents
			);
			break;
		case LOG_FREQUENT:
			var freqPlayLogListSourceBeforeSlice = sortByFrequency(
				playLogList.sort()
			);
			var freqPlayLogListSource = 
				freqPlayLogListSourceBeforeSlice.slice(
					sliceStartNum
				);
			if(sliceStartNum > 1){
				freqPlayLogListSource = freqPlayLogListSource.concat(
					shuffleArray(
						freqPlayLogListSource
					).slice(0, 5)
				);
			};
			const freqPlayLogContents = Array.from(
				new Set(freqPlayLogListSource)
			).join("\n");
			jsFileSystem.writeLocalFile(
				EDIT_FILE_PATH,
				freqPlayLogContents
			);
			break;
	};
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };
    return array;
};


function sortByFrequency(data) {
  const freq = data.reduce((r, e) => {
    if (!r[e]) r[e] = 1;
    else r[e]++;
    return r;
  }, {});

  return [...data].sort((a, b) => {
    return freq[b] - freq[a] || a - b
  });
};


// function sortByFrequency(array) {
//     var frequency = {};
//     array.forEach(function(value) { frequency[value] = 0; });
//     var uniques = array.filter(function(value) {
//         return ++frequency[value] == 1;
//     });
//     return uniques.sort(function(a, b) {
//         return frequency[b] - frequency[a];
//     });
// };
