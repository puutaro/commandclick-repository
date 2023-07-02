

/// LABELING_SECTION_START
// OCR Viewer with tts @puutaro
// 	* ocrTargetPath 
//		-> target image and pdf file path
// 	* EXEC_EXTRACT 
// 		-> extract from image or pdf
// 	* TTS_PLAY 
// 		-> text to speech play
//  * ocrLang
//      -> ocr lang
//      - en: english
//      - ja: japanese
//  * onEnglish
//      - ON: speech by English
//      - OFF: speech by local lang
//  * Pitch
// 		-> text to speech pitch
// 		- 50: normal
// 		- 50 Up: pitch up
// 		- 50 down: pitch down
//  * Speed
// 		-> text to speech speed
// 		- 50: normal
// 		- 50 Up: speed up
// 		- 50 down: speed down
//  * onTrack
//		ON: memory past number and step
//		OFF: no memory past number and step
// --
// --
// bellow setting variable main line up
// * terminalSizeType 
//  -> cmdclick terminal size option
//  - OFF: no adjust (default)
//  - LONG: LongSize
//  - SHORT: ShortSize
// * terminalOutputMode 
//  -> decide output mode in cmdclick terminal
//  - NORMAL: normal terminal output (default)
//  - REFLASH: Before terminal output, screen resflesh
//  - REFLASH_AND_FIRST_ROW: Before terminal output, screen resflesh and focus first row
//  - DEBUG: stdr + stderr
//  - NO: no output (bacground exec)
// * onUpdateLastModify
//  -> how updating file last modified status when executing
//  - ON: update this (default)
//  - OFF: no update this
// * terminalFontZoom 
//  -> adjust terminal font size (percentage)
// * terminalFontColor
//  -> adjust terminal font color
// * homeFannel
// 	-> specified fannel put always bottom in app history 
// 	   and multiple specify enable
//    ex) homeFannel=..
//    ex) homeFannel=..
//    ex) homeFannel=..
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
terminalOutputMode="NORMAL"
onUpdateLastModify="ON"
onUrlHistoryRegister="OFF"
execPlayBtnLongPress="PAGE_SEARCH"
execEditBtnLongPress="WEB_SEARCH"
terminalFontZoom="0"
terminalFontColor=""
homeFannel=""
homeFannel=""
homeFannel=""
setReplaceVariable="BTN_CMD=cmd"
setReplaceVariable="BTN_LABEL=label"
setReplaceVariable="LIST_PATH=listPath"
setReplaceVariable="LIMIT_NUM=limitNum"
setReplaceVariable="FCB_DIR_PATH=dirPath"
setReplaceVariable="FCB_PREFIX=prefix"
setReplaceVariable="FCB_SUFFIX=suffix"
setReplaceVariable="FCB_TYPE=type"
setReplaceVariable="extractMode=extract"
setReplaceVariable="ttsPlayMode=ttsPlay"
setReplaceVariable="clearCache=clearCache"
setReplaceVariable="installMode=install"
setReplaceVariable="ocrViewerDirPath=${01}/${001}"
setReplaceVariable="ocrViewerListDirPath=${ocrViewerDirPath}/list"
setReplaceVariable="ocrViewerOldPlayDirPath=${ocrViewerDirPath}/old"
setReplaceVariable="ocrViewerTxtListFilePath=${ocrViewerListDirPath}/extractedTxt.txt"
setVariableType="ocrTargetPath:ELCBFL=${LIST_PATH}=${ocrViewerTxtListFilePath}!${LIMIT_NUM}=10"
setVariableType="EXEC_EXTRACT:BTN=${BTN_CMD}=jsf '${0}' ${extractMode}"
setVariableType="TTS_PLAY:BTN=${BTN_CMD}=jsf '${0}' ${ttsPlayMode}"
setVariableType="CLEAR_CACHE:BTN=${BTN_CMD}=jsf '${0}' ${clearCache}"
setVariableType="Speed:NUM=!1..100!1"
setVariableType="Pitch:NUM=!1..100!1"
setVariableType="onTrack:CB=ON!OFF"
setVariableType="onEnglish:CB=OFF!ON"
setVariableType="INSTALL:BTN=${BTN_CMD}=jsf '${0}' ${installMode}"
setVariableType="ocrLang:CB=en!jpn"
scriptFileName="ocrViewer.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
ocrTargetPath=""
EXEC_EXTRACT=""
TTS_PLAY=""
Pitch="50"
Speed="50"
CLEAR_CACHE=""
onTrack="ON"
ocrLang="jpn"
onEnglish="OFF"
INSTALL=""
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript


let args = jsArgs.get().split("\t");
const playMode = args.at(0);
const ttsPlayMode = "${ttsPlayMode}";
const clearCacheMode = "${clearCache}";
const installMode = "${installMode}";
const extractMode = "${extractMode}";
const playListDirPath = `${ocrViewerDirPath}/playList`;
jsFileSystem.createDir(
	playListDirPath
);
const shellDirPath = `${ocrViewerDirPath}/sh`;
const installShellPath = `${shellDirPath}/install.sh`;
const ocrShellPath = `${shellDirPath}/ocr.sh`;
const playListFilePath = `${playListDirPath}/playList.txt`;
const txtSuffix = ".txt";
const currentScriptName = "${02}";
const commandClickRootDirPath = "${00}";
const currentRawScriptName = jsPath.trimAllExtend(
	currentScriptName
);
const rawOcrTargetFileName = rowTargetOcrFileName();
jsFileSystem.createDir(
	"${ocrViewerOldPlayDirPath}"
);
const ocrViewerTtsTextFilePath = `${ocrViewerOldPlayDirPath}/${rawOcrTargetFileName}${txtSuffix}`;
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
switcher();


function switcher(){
	switch(playMode){
		case clearCacheMode:
			execClearCache();
			exitZero();
			return;
		case installMode:
			jsToast.short("install");
			execInstall();
			exitZero();
			return;
	};
	switch(playMode){
		case "":
			exitWhenNoExtract();
			execLoadText();
			break;
		case ttsPlayMode:
			exitWhenNoExtract();
			execTtsPlay();
			break;
		case extractMode:
			csvCheckPathAndRegister(ocrTargetPath);
			saveExtractTextByOcr();
			break;
	};
};

function execTtsPlay(){
	jsFileSystem.writeLocalFile(
	    playListFilePath,
	   `${ocrViewerTtsTextFilePath}`
	);
	jsTextToSpeech.speech(
	    playListFilePath,
	    "",
	    "",
	    "",
	    onEnglish,
	    onTrack,
	    Speed,
    	Pitch,
	);
};


function saveExtractTextByOcr(){
	const isOldExtracted = judgeAlreadyExtract();
	if(
		isOldExtracted
	) {
		alert(`Already extarcted\n ${ocrViewerTtsTextFilePath}`);
		exitZero();
		return;
	};
	jsFileSystem.createDir(
		"${ocrViewerListDirPath}"
	);
	cmdIntent.run(
		"bash " + ` \"${ocrShellPath}\"`
		+ ` \"${ocrTargetPath}\"`
		+ ` \"${ocrLang}\"`
		+ ` 2>&1`
	);
};


function csvCheckPathAndRegister(
	inputPath
){
	extendCheckInputPath(
		inputPath
	);
	existCheckInputPath(
		inputPath
	);
	jsListSelect.updateListFileCon(
		"${ocrViewerTxtListFilePath}",
		`${inputPath}`
	);
};

function extendCheckInputPath(
	inputPath
){
	let permittionExtends = ["txt", "csv", "tsv"];
	const checkNg = jsPath.checkExtend(
		inputPath,
		permittionExtends.join("\t")
	);
	if(
		!checkNg
	) return;
	const existExtend = inputPath.match(
		/\.[a-zA-Z0-9]*$/
	);
	if(
		existExtend
	) return;
	alert(
		`Extend must be ${permittionExtends.join(", ")}\n\n ${inputPath}`
	);
	exitZero();
};


function existCheckInputPath(
	inputPath
){
	const existFile = jsFileSystem.isFile(
		inputPath
	);
	if(existFile) return;
	alert(
		`No exist\n ${inputPath}`
	);
	exitZero();
};


function execLoadText(){
	jsUrl.loadUrl(ocrViewerTtsTextFilePath);
};

function execClearCache(){
	jsFileSystem.removeDir(
		"${ocrViewerOldPlayDirPath}"
	);
	removeEachHtmlPosi();
	jsToast.short("clear");
};


function removeEachHtmlPosi(){
	const scrollPosiDirPath = `${commandClickRootDirPath}/temp/txtHtml/scrollPosi/${currentRawScriptName}`;
	jsFileSystem.removeDir(scrollPosiDirPath);
};

function rowTargetOcrFileName(){
	const rawocrTargetPath = jsPath.trimAllExtend(
		ocrTargetPath,
	);
	return jsPath.basename(
		rawocrTargetPath
	);
};


function execInstall(){
	cmdIntent.run(
		"bash " + ` \"${installShellPath}\"`
	);
};

function judgeAlreadyExtract(){
	jsFileSystem.createDir(
		"${ocrViewerOldPlayDirPath}"
	);
	const isOldTxtFile = jsFileSystem.isFile(
		ocrViewerTtsTextFilePath
	);
	return isOldTxtFile;
};

function exitWhenNoExtract(){
	const isOldExtracted = judgeAlreadyExtract();
	if(!isOldExtracted){
		alert(
			`no extracted: ${ocrViewerTtsTextFilePath}`
		);
		exitZero();
	};
};
