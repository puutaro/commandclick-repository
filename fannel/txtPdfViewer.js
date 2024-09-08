

/// LABELING_SECTION_START
// https://github.com/puutaro/txtPdfViewer
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
terminalOutputMode="NORMAL"
onUpdateLastModify="ON"
onUrlHistoryRegister="OFF"
onAdBlock="OFF"
disableSettingValsEdit="ON"
execPlayBtnLongPress="PAGE_SEARCH"
execEditBtnLongPress="WEB_SEARCH"
terminalFontZoom="0"
terminalFontColor=""
homeFannelsPath=""
setReplaceVariables="file://"
setVariableTypes="file://"
hideSettingVariables="file://"
playButtonConfig="caption=extract,icon=shortcut"
settingButtonConfig="icon=open_close,caption=opnClse,click=func=SIZING,longClick=func="
scriptFileName="txtPdfViewer.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
txtPdfPath=""
TTS_PLAY=""
Pitch="50"
Speed="50"
CLEAR_CACHE=""
onTrack="ON"
toLang="-"
longPressMenuTtsSwitch="OFF"
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript


let args = jsArgs.get().split("\t");
var playMode = args.at(0);
const menuMode = "menu";
const ttsPlayMode = "${ttsPlayMode}";
const clearCacheMode = "${clearCache}";
const noTransMark = "-";
textPdfViewerForMenu();
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
const txtPdfViewerTtsTextFilePath = makeTxtPdfViewerTtsTextFilePath();
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
	let extraSettingMapStr = [
		`transMode=${toLang}`,
		`onTrack=${onTrack}`,
		`speed=${Speed}`,
		`pitch=${Pitch}`,
	].join("|");
	jsTextToSpeech.speech(
	    playListFilePath,
	    extraSettingMapStr,
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
		noConvertExtends.join("&"),
	);
	const isNoExtend = !txtPdfPath.match(
		/\.[a-zA-Z0-9]*$/
	);
	if(
		isNoConvertFile
		|| isNoExtend
	) {
		const txtPdfCon = jsFileSystem.readLocalFile(
			txtPdfPath
		);
		jsFileSystem.writeLocalFile(
			txtPdfViewerTtsTextFilePath,
			txtPdfCon,
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
	existCheckInputPath(
		inputPath
	);
	jsListSelect.updateListFileCon(
		"${txtPdfViewerTxtPdfListFilePath}",
		`${inputPath}`
	);
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
	const cmdclickLongPressLinkUrlStr = "${ENCRPT_LONG_PRESS_LINK_URL}".replace(
		"ENCRPT_",
		""
	);
	const cmdclickLongPressLinkUrl = 
		"${LONG_PRESS_LINK_URL}";
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
	if(
		longPressMenuTtsSwitch == "ON"
	)	playMode = ttsPlayMode;
	else playMode = menuMode;
};

function makeTxtPdfViewerTtsTextFilePath(){
	if( 
		!toLang
		|| toLang == noTransMark
	) return `${txtPdfViewerOldPlayDirPath}/${rawTxtPdfFileName}${txtSuffix}`;
	return `${txtPdfViewerOldPlayDirPath}/${rawTxtPdfFileName}_${toLang}${txtSuffix}`;
};


