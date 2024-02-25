

/// LABELING_SECTION_START
// https://github.com/puutaro/cmdYoutuberU
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
onAutoExec="ON"
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
scriptFileName="cmdYoutuberU.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
searchWord=""
playMode="shuffle"
onWebSearchMode="ON"
PLAY="tubePlay"
numberPlay="1"
STOP=""
tubePlayListName="tubePlayList.tsv"
EDIT_TUBE_PLAY_LIST=""
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
const REVERSE_MODE = "reverse";
const EDIT_SITE_WEB_MODE = "edit_site_web";
const NoExtend = "NoExtend";
const TSV_SUFFIX = ".tsv";
const FANNEL_SCRIPT_PATH = "${01}/${02}";
const cmdTubePlayerDirPath = "${cmdTubePlayerDirPath}";
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
let noWebSearchModeList = ["OFF"];

var FIRST_ARGS = args.at(0);
if(
	FIRST_ARGS == PLAY
	|| FIRST_ARGS == "${URL_HISTORY_CLICK_MODE}"
){
	FIRST_ARGS = playMode;
};
execStop();
decideStremingMode();
searchWord = searchWord.trim();

if(
	onWebSearchMode != "OFF" 
	&& !["EDIT_TUBE_PLAY_LIST"].includes(FIRST_ARGS)
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

const cURRENT_REGISTER_SEARCH_STRING = `${searchWord}\t${onWebSearchMode}`;
const ENABLE_UPDATE_WEB_SEARCH_LIST = judgeUpdateWebSearchList();
const WEB_SEARCH_ARGS = `${onWebSearchMode}!${searchWord}!${ENABLE_UPDATE_WEB_SEARCH_LIST}`;
argSwitcher();


function argSwitcher() {
	jsFileSystem.createDir(
		cmdTubePlayerTmpDirPath
	);
	jsFileSystem.createDir(
		"${cmdTubePlayerEvidenceDirPath}"
	);
	installCheck();
	registerWebSearchWord();
	updateSeachWordList();
	switch(FIRST_ARGS){
		case "":
			editSiteHandler();
			break;
		case "onAutoExec":
	    	jsUbuntu.boot();
	    break;
		case INSTALL_MODE:
			jsToast.short("Installing..");
			jsUbuntu.execScriptByBackground(
				EXEC_SHELL_PATH,
				`${INSTALL_MODE}`,
				1,
			);
			break;
		case SHUFFLE_MODE:
			jsUbuntu.boot();
			jsUbuntu.execScriptByBackground(
				EXEC_SHELL_PATH,
				`${SHUFFLE_MODE}\t${EDIT_FILE_PATH}\t${WEB_SEARCH_ARGS}`,
				1,
			);
			break;
		case ORDINALY_MODE:
			jsUbuntu.boot();
			jsUbuntu.execScriptByBackground(
				EXEC_SHELL_PATH,
				`${ORDINALY_MODE}\t${EDIT_FILE_PATH}\t${WEB_SEARCH_ARGS}\t`,
				1,
			);
			break;
		case REVERSE_MODE:
			jsUbuntu.boot();
			jsUbuntu.execScriptByBackground(
				EXEC_SHELL_PATH,
				`${REVERSE_MODE}\t${EDIT_FILE_PATH}\t${WEB_SEARCH_ARGS}`,
				1,
			);
			break;
		case NUMBER_MODE:
			jsUbuntu.boot();
			jsUbuntu.execScriptByBackground(
				EXEC_SHELL_PATH,
				`${NUMBER_MODE}\t${EDIT_FILE_PATH}\t${WEB_SEARCH_ARGS}\t${numberPlay}`,
				1,
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
	};
};

function editSiteHandler(){
	if(
		noWebSearchModeList.includes(onWebSearchMode)
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
	jsUbuntu.execScriptByBackground(
		EXEC_SHELL_PATH,
		`${EDIT_SITE_WEB_MODE}\t${EDIT_FILE_PATH}\t${WEB_SEARCH_ARGS}`,
		1,
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

function updateSeachWordList(){
	if(
		onWebSearchMode == "OFF"
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
		onWebSearchMode == "OFF"
	) return false;
	if(
		!searchWord
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
		onWebSearchMode != "OFF"
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

function capitalize(str) {
	if (
		typeof str !== 'string' 
		|| !str
	) return str;
	return str.charAt(0).toLowerCase() 
		+ str.slice(1);
};


function decideStremingMode(){
	const targetUrl = "${LONG_PRESS_LINK_URL}";
    const cmdclickLongPressLinkUrlStr = "${ENCRPT_LONG_PRESS_LINK_URL}".replace(
        "ENCRPT_",
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
    jsUbuntu.boot();
    jsToast.short(
    	`streaming ${targetUrl}`
    );
    const tempTubePlayListName = "tubeTmpPlayList.tsv";
    FIRST_ARGS = "ordinaly";
    onWebSearchMode = "OFF";
  	tubePlayListName = tempTubePlayListName;
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
	jsUbuntu.execScriptByBackground(
		EXEC_SHELL_PATH,
		`${STOP_MODE}`,
		1
	);
	exitZero();
};

function installCheck(){
	switch(FIRST_ARGS){
		case "":
		case "onAutoExec":
		case INSTALL_MODE:
		case EDIT_TUBE_PLAY_LIST_MODE:
			return;
	};
	const isFile = jsFileSystem.isFile(
		"${cmdTubePlayerInstallCompFilePath}"
	);
	if(!isFile) {
		jsToast.short(`Done install?`);
		exitZero();
	};
};

