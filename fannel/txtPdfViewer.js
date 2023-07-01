

/// LABELING_SECTION_START
// text pdf viewer with tts @puutaro
// 	* txtPdfPath 
//		-> pdf file path
// 	* TTS_PLAY 
// 		-> text to speech play
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
setReplaceVariable="ttsPlayMode=ttsPlay"
setReplaceVariable="clearCache=clearCache"
setReplaceVariable="txtPdfViewerDirPath=${01}/${001}"
setReplaceVariable="txtPdfViewerListDirPath=${txtPdfViewerDirPath}/list"
setReplaceVariable="txtPdfViewerOldPlayDirPath=${txtPdfViewerDirPath}/old"
setReplaceVariable="txtPdfViewerTxtPdfListFilePath=${txtPdfViewerListDirPath}/txtPdf.txt"
setVariableType="txtPdfPath:ELCBFL=${LIST_PATH}=${txtPdfViewerTxtPdfListFilePath}!${LIMIT_NUM}=10"
setVariableType="TTS_PLAY:BTN=${BTN_CMD}=jsf '${0}' ${ttsPlayMode}"
setVariableType="CLEAR_CACHE:BTN=${BTN_CMD}=jsf '${0}' ${clearCache}"
setVariableType="Speed:NUM=!1..100!1"
setVariableType="Pitch:NUM=!1..100!1"
setVariableType="onTrack:CB=ON!OFF"
setVariableType="onEnglish:CB=OFF!ON"
scriptFileName="txtPdfViewer.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
txtPdfPath=""
TTS_PLAY=""
Pitch="50"
Speed="50"
CLEAR_CACHE=""
onTrack="ON"
onEnglish="OFF"
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript


let args = jsArgs.get().split("\t");
const playMode = args.at(0);
const ttsPlayMode = "${ttsPlayMode}";
const clearCacheMode = "${clearCache}";
const playListDirPath = `${txtPdfViewerDirPath}/playList`;
jsFileSystem.createDir(
	playListDirPath
);
const playListFilePath = `${playListDirPath}/playList.txt`;
const txtSuffix = ".txt";
const rawTxtPdfFileName = rowTxtPdfFileName();
jsFileSystem.createDir(
	"${txtPdfViewerOldPlayDirPath}"
);
const txtPdfViewerTtsTextFilePath = `${txtPdfViewerOldPlayDirPath}/${rawTxtPdfFileName}${txtSuffix}`;
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
	csvCheckPathAndRegister(txtPdfPath);
	saveExtractTextFromPdf();
	switch(playMode){
		case "":
			execTxtPdf();
			break;
		case ttsPlayMode:
			execTtsPlay();
			break;
		case clearCacheMode:
			execClearCache();
			break;
	}
}

function execTtsPlay(){
	jsFileSystem.writeLocalFile(
	    playListFilePath,
	   `${txtPdfViewerTtsTextFilePath}`
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


function saveExtractTextFromPdf(){
	jsFileSystem.createDir(
		"${txtPdfViewerOldPlayDirPath}"
	);
	const isTextFile = jsPath.checkExtend(
		txtPdfPath,
		txtSuffix,
	);
	if(
		isTextFile
	) {
		jsFileSystem.writeLocalFile(
			txtPdfViewerTtsTextFilePath,
			jsFileSystem.readLocalFile(
				txtPdfPath
			),
		);
		return;
	};
	const isOldTxtFile = jsFileSystem.isFile(
		txtPdfViewerTtsTextFilePath
	);
	if(
		isOldTxtFile
	){
		return jsFileSystem.readLocalFile(
			txtPdfViewerTtsTextFilePath
		);
	};
	jsFileSystem.createDir(
		"${txtPdfViewerListDirPath}"
	);
	const txtPdfCon = jsPdf.extractText(txtPdfPath);
	if(!txtPdfCon) {
		jsToast.short("no converted test");
		return;
	};
	jsFileSystem.writeLocalFile(
		txtPdfViewerTtsTextFilePath,
		txtPdfCon,
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
		"${CURRENT_INUPT_CSV_LIST_FILE_PATH}",
		`${inputPath}`
	);
};

function extendCheckInputPath(
	inputPath
){
	let permittionExtends = ["csv", "tsv"];
	const checkOk = jsPath.checkExtend(
		inputPath,
		permittionExtends.join("\t")
	);
	if(checkOk) return;
	alert(
		`Extend must be ${permittionExtends.join(", ")}\n\n ${inputPath}`
	);
	exitZero();
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
		"${txtPdfViewerTxtPdfListFilePath}",
		`${inputPath}`
	);
};

function extendCheckInputPath(
	inputPath
){
	let permittionExtends = ["pdf", "txt"];
	const checkOk = jsPath.checkExtend(
		inputPath,
		permittionExtends.join("\t")
	);
	if(checkOk) return;
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
		`No exist \n\n ${inputPath}`
	);
	exitZero();
};


function execTxtPdf(){
	jsUrl.loadUrl(txtPdfViewerTtsTextFilePath);
};

function execClearCache(){
	jsFileSystem.removeDir(
		"${txtPdfViewerOldPlayDirPath}"
	);
	jsToast.short("clear");
};


function rowTxtPdfFileName(){
	const rawTxtPdfPath = jsPath.trimAllExtend(
		txtPdfPath,
	);
	return jsPath.basename(
		rawTxtPdfPath
	);
};
