

/// LABELING_SECTION_START
// textToSpeech player @puutaro
//	* play 
// 		-> tts play list site
//	* manageText 
// 		-> Target music file saved directory path
// 	* playListName 
//		-> Input or select play list file name
//		- Prefix must be "music" ex) "ttsPlayList"
// 	* ttsPlay 
//		-> Select shuffle or ordinaly and press
//		- Press "Exec" and execute play list
// 	* numberPlay 
//		-> Input or inc/dec number
//		- Press "Exec" and play number
// 	* gmailToFile 
//		-> write gmail contetns to file
//		- when no gmail launch, gmail launch
//		- when look gmail body, write this contents to file 
// 	* manageText 
//		-> remove text file or add one to editHtmlSite 
//		- select text file and click "MNG" button
//  * onTrack
//		ON: memory past number and step
//		OFF: no memory past number and step
//	* Volume control enable when CommandClick hide
// --
// --
// Bellow setting variable main line up
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
ignoreHistoryPaths="${01}"
onUrlHistoryRegister="ON"
execPlayBtnLongPress="WEB_SEARCH"
execEditBtnLongPress=""
terminalFontZoom="0"
terminalColor=""
terminalFontColor=""
scriptFileName="ttsPlayer.js"
setReplaceVariable="BTN_CMD=cmd"
setReplaceVariable="BTN_LABEL=label"
setReplaceVariable="FCB_DIR_PATH=dirPath"
setReplaceVariable="FCB_PREFIX=prefix"
setReplaceVariable="FCB_SUFFIX=suffix"
setReplaceVariable="FCB_TYPE=type"
setReplaceVariable="LIST_PATH=listPath"
setReplaceVariable="LIMIT_NUM=limitNum"
setReplaceVariable="TTS_PREFIX=tts"
setReplaceVariable="ttsPlayerDirPath=${01}/${001}"
setReplaceVariable="cmdTtsPlayerSaveDirPath=${ttsPlayerDirPath}/save"
setReplaceVariable="cmdTtsPlayerEditDirPath=${ttsPlayerDirPath}/edit"
setReplaceVariable="cmdTtsPlayerTempDirPath=${ttsPlayerDirPath}/temp"
setReplaceVariable="cmdTtsPlayerTempFilePath=${cmdTtsPlayerTempDirPath}/tempPlay"
setReplaceVariable="cmdTtsPlayerListDirPath=${ttsPlayerDirPath}/list"
setReplaceVariable="cmdTtsPlayerDirListFilePath=${cmdTtsPlayerListDirPath}/music_dir_list"
setReplaceVariable="cmdTtsPlayerGmailListFilePath=${cmdTtsPlayerListDirPath}/gmail_list"
setVariableType="manageText:EFCBB=${FCB_DIR_PATH}=${cmdTtsPlayerSaveDirPath}!${FCB_SUFFIX}=.txt|${BTN_CMD}=jsf '${0}' manageText!${BTN_LABEL}=MNG"
setVariableType="playListName:EFGB=${FCB_DIR_PATH}=${cmdTtsPlayerEditDirPath}!${FCB_PREFIX}=${TTS_PREFIX}!${FCB_SUFFIX}=.tsv"
setVariableType="playMode:CB=ordinaly!shuffle!reverse"
setVariableType="PLAY:BTN=${BTN_CMD}=::TermOut::jsf '${0}'"
setVariableType="numberPlay:NUMB=!1..1000!1|${BTN_CMD}=::TermOut::jsf '${0}' number!${BTN_LABEL}=Play"
setVariableType="STOP:BTN=${BTN_CMD}=jsf '${0}' STOP"
setVariableType="EDIT_PLAY_LIST:BTN=${BTN_CMD}=jsf '${0}' EDIT_PLAY_LIST"
setVariableType="Speed:NUM=!1..100!1"
setVariableType="Pitch:NUM=!1..100!1"
setVariableType="onEnglish:CB=OFF!ON"
setVariableType="onTrack:CB=ON!OFF"
setVariableType="gmailToFile:ELCBB=${LIST_PATH}=${cmdTtsPlayerGmailListFilePath}!${LIMIT_NUM}=10|${BTN_CMD}=jsf '${0}' gmailToFile"
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
onEnglish="OFF"
onTrack="ON"
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript


let args = jsArgs.get().split("\t");
var FIRST_ARGS = args.at(0);
const APP_URL_HISTORY_PATH="${01}/system/url/cmdclickUrlHistory.tsv";
const tsvExtend = ".tsv";
if(FIRST_ARGS == PLAY){
	FIRST_ARGS = playMode;
};
Speed = Number(Speed) / 50;
if(Speed > 1000) Speed = 1000;
Pitch = Number(Pitch) / 50;
if(Pitch > 1000) Pitch = 1000;
if(
    onEnglish != "ON"
) onEnglish="";
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
			jsIntent.launchEditSite(
				EDIT_FILE_PATH,
				APP_URL_HISTORY_PATH,
				"false",
				"true",
				"true",
				"urlString.startsWith('http');"
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
				`playListName:EFCB=${FCB_DIR_PATH}=${cmdTtsPlayerEditDirPath}!${FCB_PREFIX}=${TTS_PREFIX}!${FCB_SUFFIX}=${tsvExtend}`,
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
	jsTextToSpeech.speech(
	    cmdTtsPlayerTempFilePath,
	    playModeArg,
	    onRoop,
	    numberArg,
	    onEnglish,
	    onTrack,
	    Speed,
	    Pitch,
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
	const onRemove = confirm(
		`remove ok?\n ${manageText}`
	);
	if(!onRemove) return;
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
	let titleEntry = document.getElementsByClassName("Mh");
	const title = replaceSimble(
		titleEntry[0].textContent
	);
	const catFileName = `${title}${TXT_EXTEND}`;
	const bodyEntry = document.getElementsByClassName('wh');
	const body = bodyEntry[0].textContent;
	const saveDir = `${cmdTtsPlayerSaveDirPath}`;
	jsFileSystem.createDir(saveDir);
	const saveTextFile = `${saveDir}/${catFileName}`;
	jsFileSystem.writeLocalFile(
		saveTextFile,
		body,
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

