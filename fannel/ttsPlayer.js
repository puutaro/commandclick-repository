

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
//  * toLang
//  -> translate by specified language
//      - - : default language
//      - en: english
//      - zh: chinese
//      - es: spanish
//      - ko: korean
//      - ja: japanese
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
// * execPlayBtnLongPress
//  -> execute when play button long press
//    - WEB_SEARCH: apear web search bar
//   - PAGE_SEARCH: apear page search bar
//    - js file path: execute js file
// * execEditBtnLongPress
//  -> execute when edit button long press
//    - WEB_SEARCH: apear web search bar
//    - PAGE_SEARCH: apear page search bar
//    - js file path: execute js file
// * terminalFontZoom 
// 	-> adjust terminal font size (percentage)
// * terminalFontColor 
// 	-> adjust terminal font color
// * terminalColor 
// 	-> adjust terminal background color
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
ignoreHistoryPaths="file://${01}/${001}/settingVariables/ignoreHistoryPaths.js"
setReplaceVariables="file://${01}/${001}/settingVariables/setReplaceVariables.js"
setVariableTypes="file://${01}/${001}/settingVariables/setVariableTypes.js"
hideSettingVariables="file://${01}/${001}/settingVariables/hideSettingVariables.js"
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
if(FIRST_ARGS == PLAY){
	FIRST_ARGS = playMode;
};
Speed = Number(Speed) / 50;
if(Speed > 1000) Speed = 1000;
Pitch = Number(Pitch) / 50;
if(Pitch > 1000) Pitch = 1000;
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
	jsTextToSpeech.speech(
	    cmdTtsPlayerTempFilePath,
	    playModeArg,
	    onRoop,
	    numberArg,
	    toLang,
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

