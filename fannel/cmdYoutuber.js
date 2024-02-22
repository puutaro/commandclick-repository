

/// LABELING_SECTION_START
// https://github.com/puutaro/cmdYoutuber
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
terminalOutputMode="NORMAL"
execPlayBtnLongPress="WEB_SEARCH"
onUpdateLastModify="ON"
onUrlHistoryRegister="ON"
terminalFontZoom="0"
terminalColor=""
terminalFontColor=""
setReplaceVariables="file://"
setVariableTypes="file://"
hideSettingVariables="file://"
scriptFileName="cmdYoutuber.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
searchWord=""
playMode="shuffle"
onSearchMode="SHORT"
PLAY="tubePlay"
numberPlay="1"
STOP=""
tubePlayListName="tubePlayList.tsv"
minMinutes="0"
maxMinutes="0"
EDIT_TUBE_PLAY_LIST=""
playLogName="playLogDefault"
EDIT_PLAY_LOG_NAME=""
playLogOut=""
Install="install"
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript


let args = jsArgs.get().split("\t");
const APP_URL_HISTORY_PATH="${01}/system/url/cmdclickUrlHistory.tsv";
const INSTALL_MODE = "install";
const SHUFFLE_MODE = "shuffle";
const ORDINALY_MODE = "ordinaly";
const NUMBER_MODE = "number";
const STOP_MODE="stop";
const EDIT_TUBE_PLAY_LIST_MODE = "EDIT_TUBE_PLAY_LIST";
const EDIT_PLAY_LOG_NAME_MODE = "EDIT_PLAY_LOG_NAME";
const REVERSE_MODE = "reverse";
const EDIT_SITE_WEB_MODE = "edit_site_web";
const PLAY_LOG_MODE = "playLogOut";
const NoExtend = "NoExtend";
const TSV_SUFFIX = ".tsv";
const LOG_PREFIX = "playLog";
const FANNEL_SCRIPT_PATH = "${01}/${02}";
const cmdTubePlayerDirPath = "${cmdTubePlayerDirPath}";
const PLAY_LOG_DIR_PATH = "${PLAY_LOG_DIR_PATH}";
const cmdTubePlayerEditDirPath = "${cmdTubePlayerEditDirPath}";
jsFileSystem.createDir(cmdTubePlayerEditDirPath);
const cmdTubePlayerShellDirPath = `${cmdTubePlayerDirPath}/shell`;
const EXEC_SHELL_PATH = `${cmdTubePlayerShellDirPath}/cmdYoutuber.sh`;
const EXEC_YTFZF_PATH = `${cmdTubePlayerShellDirPath}/ytfzfForFannel.sh`;
const cmdTubePlayerTmpDirPath = `${cmdTubePlayerDirPath}/temp`;
const cmdTubePlayerSearchWordFilePath = `${cmdTubePlayerTmpDirPath}/searchWord`;
const cmdTubePlayerListDirPath = "${cmdTubePlayerListDirPath}";
const cmdTubePlayerListFilePath = "${cmdTubePlayerListFilePath}";
const TUBE_PREFIX = "tube";
const searchPlayListName = "SearchPlayList.tsv";
const defaultTubePlayListTsvName = "tubePlayList.tsv";
const defaultLogFileName = "playLogDefault";
const LOG_RUNDOM = "LOG_RND";
const LOG_FREQUENT = "LOG_FREQ";
let lOG_SEARCH_LIST = [LOG_RUNDOM, LOG_FREQUENT];
let noWebSearchModeList = ["OFF"].concat(lOG_SEARCH_LIST);

var FIRST_ARGS = args.at(0);
if(FIRST_ARGS == PLAY){
	FIRST_ARGS = playMode;
};
execStop();
var noLogCat = "";
decideStremingMode();
searchWord = searchWord.trim();
initNumVariable();
const PLAY_LOG_FILE_PATH = makeCreatorJSPathForLog(
	PLAY_LOG_DIR_PATH,
	playLogName,
);


updateByVariableWhenDiff(
	"playLogName",
	PLAY_LOG_FILE_PATH.split("/").at(-1),
	playLogName,
);

if(
	onSearchMode != "OFF" 
	&& !["EDIT_TUBE_PLAY_LIST", "EDIT_PLAY_LOG_NAME"].includes(FIRST_ARGS)
){
	tubePlayListName = searchPlayListName;
};
tubePlayListName = checkTubeListName(
	tubePlayListName
);
const EDIT_FILE_PATH = makeCreatorJSPathForTubePlayList(
	cmdTubePlayerEditDirPath,
	tubePlayListName,
);
updateByVariableWhenDiff(
	"tubePlayListName",
	EDIT_FILE_PATH.split("/").at(-1),
	tubePlayListName,
);

const cURRENT_REGISTER_SEARCH_STRING = `${searchWord}\t${onSearchMode}\t${minMinutes},${maxMinutes}`;
const ENABLE_UPDATE_WEB_SEARCH_LIST = judgeUpdateWebSearchList();
const WEB_SEARCH_ARGS = `${onSearchMode}\t${searchWord}\t${ENABLE_UPDATE_WEB_SEARCH_LIST}\t${minMinutes},${maxMinutes}\t${PLAY_LOG_FILE_PATH}`;

argSwitcher();


function argSwitcher() {
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
			jsCmdIntent.run_S(
				"bash " + ` \"${EXEC_SHELL_PATH}\"` + 
				` \"${INSTALL_MODE}\"`
			);
			break;
		case SHUFFLE_MODE:
			jsCmdIntent.run_S(
				"bash " + ` \"${EXEC_SHELL_PATH}\"` + 
				` \"${SHUFFLE_MODE}\"` +
				` \"${EDIT_FILE_PATH}\"` + 
				` \"${WEB_SEARCH_ARGS}\"`
			);
			break;
		case ORDINALY_MODE:
			jsCmdIntent.run_S(
				"bash " + ` \"${EXEC_SHELL_PATH}\"` + 
				` \"${ORDINALY_MODE}\"` + 
				` \"${EDIT_FILE_PATH}\"` + 
				` \"${WEB_SEARCH_ARGS}\"` +
				` \"\"` +
				` \"${noLogCat}\"`
			);
			break;
		case REVERSE_MODE:
			jsCmdIntent.run_S(
				"bash " + ` \"${EXEC_SHELL_PATH}\"` + 
				` \"${REVERSE_MODE}\"` + 
				` \"${EDIT_FILE_PATH}\"` +
				` \"${WEB_SEARCH_ARGS}\"`
			);
			break;
		case NUMBER_MODE:
			jsCmdIntent.run_S(
				"bash " + ` \"${EXEC_SHELL_PATH}\"` + 
				` \"${NUMBER_MODE}\"` + 
				` \"${EDIT_FILE_PATH}\"` + 
				` \"${WEB_SEARCH_ARGS}\"` + 
				` \"${numberPlay}\"`
			);
			break;
		case EDIT_TUBE_PLAY_LIST_MODE:
			jsFileSelect.execEditTargetFileName(
		    "tubePlayListName",
				"renameTubePlayListName",
				cmdTubePlayerEditDirPath,
				`tubePlayListName:TXT:FSB=${FCB_DIR_PATH}=${cmdTubePlayerEditDirPath}!${FCB_PREFIX}=tube!${FCB_SUFFIX}=${TSV_SUFFIX}`,
				`tubePlayListName=${tubePlayListName}\trenameTubePlayListName=`,
				TUBE_PREFIX,
				TSV_SUFFIX,
		        "${01}/${02}",
		        "Edit tubePlayListName"
		    );
			break;
		case PLAY_LOG_MODE:
			catPlayLog();
			break;
		case EDIT_PLAY_LOG_NAME_MODE:
			jsFileSelect.execEditTargetFileName(
		        "playLogName",
		        "renamePlayLogName",
				"${PLAY_LOG_DIR_PATH}",
				`playLogName:TXT:FSB=${FCB_DIR_PATH}=${PLAY_LOG_DIR_PATH}!${FCB_PREFIX}=playLog!${FCB_SUFFIX}=${NoExtend}`,
				`playLogName=${playLogName}\trenamePlayLogName=`,
				LOG_PREFIX,
				NoExtend,
		        "${01}/${02}",
		        "Edit playLogName"
		    );
			break;
	};
};

function editSiteHandler(){
	if(
		noWebSearchModeList.includes(onSearchMode)
	){
		let extraMapStr = [
			`src_path=${APP_URL_HISTORY_PATH}`,
			`on_click_sort=false`,
			'on_sortable_js=true',
			`on_click_url=true`,
			`on_dialog=false`
		].join("|");
		jsIntent.launchEditSite(
			EDIT_FILE_PATH,
			extraMapStr,
			"urlString.startsWith('http') && urlString.includes(\"youtube\");",
		);
		return;
	};
	if(!ENABLE_UPDATE_WEB_SEARCH_LIST){
		let extraMapStr = [
			`on_click_sort=false`,
			'on_sortable_js=true',
			`on_click_url=true`,
			`on_dialog=false`
		].join("|");
		jsIntent.launchEditSite(
			EDIT_FILE_PATH,
			extraMapStr,
			"true",
		);
		return;
	};
	jsToast.short("start..");
	jsCmdIntent.run_S(
		"bash " + ` \"${EXEC_SHELL_PATH}\"` + 
		` \"${EDIT_SITE_WEB_MODE}\"` + 
		` \"${EDIT_FILE_PATH}\"` + 
		` \"${WEB_SEARCH_ARGS}\"`
	);
};

function makeCreatorJSPathForTubePlayList(
	dirPath,
	tubePlayListNameSrc,
){
	if(!tubePlayListNameSrc){
		tubePlayListNameSrc = defaultTubePlayListTsvName;
	};
	tubePlayListNameSrc = jsPath.compPrefix(
		tubePlayListNameSrc,
		TUBE_PREFIX
	);
	tubePlayListName = jsPath.compExtend(
		tubePlayListNameSrc,
		TSV_SUFFIX
	);
	return [dirPath, tubePlayListName].join('/');
};


function makeCreatorJSPathForLog(
	dirPath,
	logFileName,
){
	if(!logFileName){
		logFileName = defaultLogFileName;
	};
	playLogName = jsPath.compPrefix(
		logFileName,
		LOG_PREFIX
	);
	return [dirPath, playLogName].join('/');
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


function checkTubeListName(
	tubePlayListName
){
	if(
		onSearchMode != "OFF"
	) return tubePlayListName;
	if(
		tubePlayListName != searchPlayListName
		&& tubePlayListName != `${TUBE_PREFIX}${searchPlayListName}`
	) return tubePlayListName;
	const selectedTubePlayListName = selectTubeListWhenWebSearchOff();
	if(
		!selectedTubePlayListName
	) exitZero();
	jsEdit.updateByVariable(
		FANNEL_SCRIPT_PATH,
	    "tubePlayListName",
	    selectedTubePlayListName
	);
	return selectedTubePlayListName
};


function selectTubeListWhenWebSearchOff(){
	const webSearchTubeTsvName = `${TUBE_PREFIX}${searchPlayListName}`;
	const tubePlayTsvListCon = jsFileSystem.showFileList(
		cmdTubePlayerEditDirPath
	).split("\t").filter(
		function(fileName){
			return 
				fileName.endsWith(TSV_SUFFIX) 
				&& fileName != webSearchTubeTsvName
		}).join("\t");
	return jsDialog.listDialog(
			"Select bellow tube play list",
			"",
			tubePlayTsvListCon
		);
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
		jsToast.short(
			`not exist log`
		);
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

function updateByVariableWhenDiff(
	tergetVariableName,
	currentVariableValue,
	pastVariableValue,
){
	if(
		currentVariableValue == pastVariableValue
	) return;
	jsEdit.updateByVariable(
		FANNEL_SCRIPT_PATH,
	    tergetVariableName,
	    currentVariableValue
	);
};

function initNumVariable(){
	const initPrefix = "init";
	let initList = [
		`${initPrefix}MinMinutes`,
		`${initPrefix}MaxMinutes`,
	];
	const initIndex = initList.indexOf(FIRST_ARGS);
	if(initIndex < 0) return;
	const initPrefixRegex = new RegExp(`^${initPrefix}`);
	const updateVariableName = 
		initList[initIndex].replace(initPrefixRegex, '');
	jsEdit.updateByVariable(
		FANNEL_SCRIPT_PATH,
        capitalize(updateVariableName),
        "0"
    );
	exitZero();
};

function capitalize(str) {
	if (
		typeof str !== 'string' 
		|| !str
	) return str;
	return str.charAt(0).toLowerCase() 
		+ str.slice(1);
};


function decideStremingMode(){
		const targetUrl = "CMDCLICK_LONG_PRESS_LINK_URL";
    const cmdclickLongPressLinkUrlStr = "CMDCLICK_ENCRPT_LONG_PRESS_LINK_URL".replace(
        "_ENCRPT",
        ""
    );
    if(
        targetUrl == cmdclickLongPressLinkUrlStr
    ) return;
    if(
    	!targetUrl.includes("https://")
    	|| !targetUrl.includes("youtube")
    ) {
    	jsToast.short("no youtube url");
    	exitZero();
    	return;
  }
    if(!targetUrl) return;
    jsToast.short(
    	`streaming ${targetUrl}`
    );
    const tempTubePlayListName = "tubeTmpPlayList.tsv";
    FIRST_ARGS = "ordinaly";
    onSearchMode = "OFF";
  	tubePlayListName = tempTubePlayListName;
  	playLogName = "playLogDefault";
  	noLogCat = "on";
  	const tempEditPlayListPath = `${cmdTubePlayerEditDirPath}/${tubePlayListName}`;
  	jsFileSystem.writeLocalFile(
  		tempEditPlayListPath,
  		`${targetUrl}\t${targetUrl}`
  	);
};


function execStop(){
	if(
		FIRST_ARGS != STOP_MODE
	) return;
	jsCmdIntent.run_S(
		"bash " + ` \"${EXEC_SHELL_PATH}\"` + 
		` \"${STOP_MODE}\"`
	);
	exitZero();
};
