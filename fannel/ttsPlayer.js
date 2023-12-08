

/// LABELING_SECTION_START
// https://github.com/puutaro/ttsPlayer
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
terminalOutputMode="NORMAL"
onUpdateLastModify="ON"
onUrlHistoryRegister="ON"
onAdBlock="OFF"
execPlayBtnLongPress="WEB_SEARCH"
execEditBtnLongPress=""
terminalFontZoom="0"
terminalColor=""
terminalFontColor=""
scriptFileName="ttsPlayer.js"
ignoreHistoryPaths="file://"
setReplaceVariables="file://"
setVariableTypes="file://"
hideSettingVariables="file://"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
playListName="ttsPlayList.tsv"
playMode="ordinaly"
PLAY="ttsPlay"
numberPlay="1"
STOP=""
EDIT_PLAY_LIST=""
gmailToFile=""
manageText=""
Speed="50"
Pitch="50"
toLang="-"
onTrack="ON"
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript


let args = jsArgs.get().split("\t");
var FIRST_ARGS = args.at(0);
const APP_URL_HISTORY_PATH="${01}/system/url/cmdclickUrlHistory.tsv";
const tsvExtend = ".tsv";
if(
	FIRST_ARGS == PLAY
	|| FIRST_ARGS == "${urlHistoryClickMode}"
){
	FIRST_ARGS = playMode;
};
if(
   onTrack == "OFF"
) onTrack="";
const FANNEL_SCRIPT_PATH = "${0}";
const ttsPlayerDirPath = "${ttsPlayerDirPath}";
jsFileSystem.createDir(ttsPlayerDirPath);
const cmdTtsPlayerEditDirPath = "${cmdTtsPlayerEditDirPath}";
const cmdTtsPlayerListDirPath = "${cmdTtsPlayerListDirPath}";
jsFileSystem.createDir(cmdTtsPlayerListDirPath);
const cmdTtsPlayerDirListFilePath = "${cmdTtsPlayerDirListFilePath}";
const cmdTtsPlayerTempDirPath = "${cmdTtsPlayerTempDirPath}";
const cmdTtsPlayerTempFilePath = "${cmdTtsPlayerTempFilePath}";
jsFileSystem.createDir(cmdTtsPlayerTempDirPath);
const PLAY_PROCESS_DIR_PATH = `${ttsPlayerDirPath}/process`;
const MUSIC_HISTORY_PATH = `${PLAY_PROCESS_DIR_PATH}/musicHistory.txt`;
const TTS_PREFIX = "${TTS_PREFIX}";
const EDIT_FILE_PATH = makeCreatorJSPath(playListName);
const SHUFFLE_MODE = "shuffle";
const ORDINALY_MODE = "ordinaly";
const REVERSE_MODE = "reverse";
const NUMBER_MODE = "number";
const GMAIL_TO_FILE_MODE = "gmailToFile";
const EDIT_PLAY_LIST_MODE = "EDIT_PLAY_LIST";
const STOP_MODE= "STOP";
const MANAGE_TXT_MODE = "manageText";
const onRoop = "onRoop";
const TXT_EXTEND = ".txt";


switchByArgs();


function switchByArgs(){
	updateByVariableWhenDiff(
		"playListName",
		EDIT_FILE_PATH.split("/").at(-1),
		playListName,
	);
	switch(FIRST_ARGS){
		case "":
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
				"urlString.startsWith('http');",
			);
			break;
		case SHUFFLE_MODE:
		case ORDINALY_MODE:
		case REVERSE_MODE:
			execTtsPlay(
				playMode,
				""
			);
			break;
		case NUMBER_MODE:
			execTtsPlay(
				"number",
				numberPlay
			);
			break;
		case STOP_MODE:
			jsTextToSpeech.stopService();
			jsTextToSpeech.stop();
			break;
		case GMAIL_TO_FILE_MODE:
			execGmailToFile();
			break;
		case MANAGE_TXT_MODE:
			execManageText();
			break;
		case EDIT_PLAY_LIST_MODE:
			jsFileSelect.execEditTargetFileName(
		        "playListName",
				"renameplayListName",
				cmdTtsPlayerEditDirPath,
				`playListName:TXT:FSB=${FGB_DIR_PATH}=${cmdTtsPlayerEditDirPath}!${FGB_PREFIX}=${TTS_PREFIX}!${FGB_SUFFIX}=${tsvExtend}`,
				`playListName=${playListName}\trenameplayListName=`,
				TTS_PREFIX,
				tsvExtend,
		        "${01}/${02}",
		        "Edit playListName"
		    );
			break;
	};
};

function makeCreatorJSPath(
	playListName
){
	if(!playListName){
		alert("playListName must be written");
		throw new Error('exit');
		exitZero();
	};
	playListName = jsPath.compPrefix(
		playListName,
		TTS_PREFIX
	);
	playListName = jsPath.compExtend(
		playListName,
		tsvExtend
	);
	return [cmdTtsPlayerEditDirPath, playListName].join('/');
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

function execTtsPlay(
	playModeArg,
	numberArg){
	const tempPlayListCon = jsFileSystem.readLocalFile(
		EDIT_FILE_PATH
	).split("\n").map(function(line){
		return line.split("\t").at(-1);
	}).join("\n");
	jsFileSystem.writeLocalFile(
		cmdTtsPlayerTempFilePath,
		tempPlayListCon
	);
	let extraSettingMapStr = [
		`playMode=${playModeArg}`,
		`onRoop=${onRoop}`,
		`playNumber=${numberArg}`,
		`transMode=${toLang}`,
		`onTrack=${onTrack}`,
		`speed=${Speed}`,
		`pitch=${Pitch}`,
	].join("|");
	jsTextToSpeech.speech(
	    cmdTtsPlayerTempFilePath,
	    extraSettingMapStr,
	);
};


function execManageText(){
	if(!manageText){
		alert(
			"must be specfied \"manageText\""
		);
		return;
	};
	const title = `Remove or Add? :${manageText}`;
	let manageType = {
		remove: "Remove",
		add: "Add"
	};
	const removeOrAdd = jsDialog.listDialog(
		title,
		"",
		`${manageType.remove}\t${manageType.add}`
	);
	switch(removeOrAdd){
		case "":
			exitZero();
			break; 
		case manageType.remove:
			execRemove();
			break;
		case manageType.add:
			execAdd();
			break;

	};
};

function execAdd(){
	registerEditUrlSource(
		`${cmdTtsPlayerSaveDirPath}/${manageText}`
	);
	exitZero();
};

function execRemove(){
	if(
		!manageText
	) {
		return;
	};
	const targetTextPath = 
		`${cmdTtsPlayerSaveDirPath}/${manageText}`;
	jsEdit.updateByVariable(
		FANNEL_SCRIPT_PATH,
        "manageText",
		"",
	);
	jsFileSystem.removeFile(
		targetTextPath
	);
	jsEdit.removeFromEditHtml(
		EDIT_FILE_PATH,
		targetTextPath,
	);
	jsTextToSpeech.stopService();
	jsToast.short("delete ok");
};

function execGmailToFile(){
	updateByVariableWhenDiff(
		"gmailToFile",
		gmailToFile,
		"",
	);
	jsListSelect.updateListFileCon(
		"${cmdTtsPlayerGmailListFilePath}",
		gmailToFile,
	);
	const currentUrl = window.location.href;
	if(
		!currentUrl.startsWith("https://mail")
	) {
		jsUtil.sleep(500);
		jsUrl.loadUrl(gmailToFile);
		return;
	};
	execSaveFromGmail();
};

function execSaveFromGmail(){
	let titleEntry = document.querySelector('[role="heading"]').textContent;
	const title = replaceSimble(
		titleEntry
	);
	const catFileName = `${title}${TXT_EXTEND}`;
	const body = document.getElementById("views").textContent;
	const bodyStartNum = body.lastIndexOf(titleEntry);
	const mailCon = body.substring(bodyStartNum);
	const saveDir = `${cmdTtsPlayerSaveDirPath}`;
	jsFileSystem.createDir(saveDir);
	const saveTextFile = `${saveDir}/${catFileName}`;
	jsFileSystem.writeLocalFile(
		saveTextFile,
		mailCon,
	);
	registerEditUrlSource(
		saveTextFile
	);
};

function registerEditUrlSource(
	saveTextFile
){
	const editFileCon = jsFileSystem.readLocalFile(
		EDIT_FILE_PATH
	);
	const onContain = editFileCon.split("\n").filter(function(line){
		return line == `${saveTextFile}\t${saveTextFile}`;
	}).join("");

	if(onContain) {
		alert(
			`Already contained\n ${saveTextFile}`
		);
		exitZero();
		return;
	};
	const updateEditFileCon = 
		`${saveTextFile}\t${saveTextFile}\n${editFileCon}`;
	jsFileSystem.writeLocalFile(
		EDIT_FILE_PATH,
		updateEditFileCon
	);
	jsToast.short(`save ok\n ${saveTextFile}`);
};


function replaceSimble(
	targetStr
){
	let exp = /[-A-Z0-9+&@#\/&#37;?=~_|!:,.;＃＄％＆（）＝〜＾｜￥｛｝。、＜＞＊]/ig;
	return targetStr.replaceAll(exp, "");
};
