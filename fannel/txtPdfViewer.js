

/// LABELING_SECTION_START
// text pdf viewer with tts @puutaro
// * Support long press menu
//  - src anchor 
//  - src image anchor
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
// * terminalFontZoom 
//  -> adjust terminal font size (percentage)
// * terminalFontColor
//  -> adjust terminal font color
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
// * homeFannelsPath
// 	-> specified fannel put always bottom in app history 
//      DSL button
//          - drag and sort home fannels list
//      ADD button
//          - Add fannel to home fannel list
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
terminalOutputMode="NORMAL"
onUpdateLastModify="ON"
onUrlHistoryRegister="OFF"
onAdBlock="OFF"
execPlayBtnLongPress="PAGE_SEARCH"
execEditBtnLongPress="WEB_SEARCH"
terminalFontZoom="0"
terminalFontColor=""
homeFannelsPath=""
setReplaceVariables="file://${01}/${001}/settingVariables/setReplaceVariables.js"
setVariableTypes="file://${01}/${001}/settingVariables/setVariableTypes.js"
hideSettingVariables="file://${01}/${001}/settingVariables/hideSettingVariables.js"
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
var playMode = args.at(0);
const menuMode = "menu";
textPdfViewerForMenu();
const ttsPlayMode = "${ttsPlayMode}";
const clearCacheMode = "${clearCache}";
const playListDirPath = `${txtPdfViewerDirPath}/playList`;
jsFileSystem.createDir(
	playListDirPath
);
const playListFilePath = `${playListDirPath}/playList.txt`;
const txtSuffix = ".txt";
const currentScriptName = "${02}";
const commandClickRootDirPath = "${00}";
const currentRawScriptName = jsPath.trimAllExtend(
	currentScriptName
);
var rawTxtPdfFileName = rowTxtPdfFileName();
jsFileSystem.createDir(
	"${txtPdfViewerOldPlayDirPath}"
);
jsFileSystem.createDir(
	"${txtPdfViewerStockPlayDirPath}"
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
	switch(playMode){
		case clearCacheMode:
			execClearCache();
			exitZero();
			return;
	};
	csvCheckPathAndRegister(txtPdfPath);
	saveExtractTextFromPdf();
	switch(playMode){
		case "":
			execTxtPdf();
			break;
		case menuMode:
			execTxtPdfByDialog();
			break;
		case ttsPlayMode:
			execTtsPlay();
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
	const isOldTxtFile = jsFileSystem.isFile(
		txtPdfViewerTtsTextFilePath
	);
	if(
		isOldTxtFile
	) return;
	let noConvertExtends = ["txt", "csv", "tsv"];
	const isNoConvertFile = jsPath.checkExtend(
		txtPdfPath,
		noConvertExtends.join("\t"),
	);
	const isNoExtend = !txtPdfPath.match(
		/\.[a-zA-Z0-9]*$/
	);
	if(
		isNoConvertFile
		|| isNoExtend
	) {
		jsFileSystem.copyFile(
			txtPdfPath,
			txtPdfViewerTtsTextFilePath
		);
		return;
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
	// extendCheckInputPath(
	// 	inputPath
	// );
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
	let permittionExtends = ["pdf", "txt", "csv", "tsv", "js", "jsx"];
	const checkOk = jsPath.checkExtend(
		inputPath,
		permittionExtends.join("\t")
	);
	if(checkOk) return;
	const existExtend = inputPath.match(
		/\.[a-zA-Z0-9]*$/
	);
	if(
		!existExtend
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
		`No exist \n\n ${inputPath}`
	);
	exitZero();
};


function execTxtPdf(){
	jsUrl.loadUrl(txtPdfViewerTtsTextFilePath);
};

function execTxtPdfByDialog(){
	const txtCon = jsFileSystem.readLocalFile(
		txtPdfViewerTtsTextFilePath
	);
	if(!txtCon) {
		alert("no contents");
		return
	};
	alert(txtCon);
};

function execClearCache(){
	jsFileSystem.removeDir(
		"${txtPdfViewerOldPlayDirPath}"
	);
	removeEachHtmlPosi();
	jsToast.short("clear");
};


function removeEachHtmlPosi(){
	const scrollPosiDirPath = `${commandClickRootDirPath}/temp/txtHtml/scrollPosi/${currentRawScriptName}`;
	jsFileSystem.removeDir(scrollPosiDirPath);
};

function rowTxtPdfFileName(){
	const rawTxtPdfPath = jsPath.trimAllExtend(
		txtPdfPath,
	);
	return jsPath.basename(
		rawTxtPdfPath
	);
};


function textPdfViewerForMenu(){
	const cmdclickLongPressLinkUrlStr = "CMDCLICK_ENCRPT_LONG_PRESS_LINK_URL".replace(
		"_ENCRPT",
		""
	);
	const cmdclickLongPressLinkUrl = 
		"CMDCLICK_LONG_PRESS_LINK_URL";
	if(
		cmdclickLongPressLinkUrl == cmdclickLongPressLinkUrlStr
	) return;
	const cmdClickRootDir = "${00}";
	const tempDownloadDirPath = 
		`${cmdClickRootDir}/temp/download`;
	jsCurl.getTextOrPdf(
		cmdclickLongPressLinkUrl
	);
	const downloadFileName = jsFileSystem.showFileList(
		tempDownloadDirPath
	).split("\t").at(0);
	if(!downloadFileName) {
		alert("no exist");
		exitZero();
	};
	txtPdfPath = 
		`${txtPdfViewerStockPlayDirPath}/${downloadFileName}`;
	jsFileSystem.copyFile(
		`${tempDownloadDirPath}/${downloadFileName}`,
		txtPdfPath
	);
	playMode = menuMode;
};
