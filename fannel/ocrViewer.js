

/// LABELING_SECTION_START
// file://
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
setReplaceVariables="file://"
setVariableTypes="file://"
hideSettingVariables="file://"
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
	existCheckInputPath(
		ocrTargetPath
	);
	blankCheck();
	jsListSelect.updateListFileCon(
		"${ocrViewerTxtListFilePath}",
		`${ocrTargetPath}`
	);
	moveToOldForExcludePdfOrImage();
	ocrSwitcher();
};


function ocrSwitcher(){
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
			saveExtractTextByOcr();
			break;
	};
};

function execTtsPlay(){
	jsFileSystem.writeLocalFile(
	    playListFilePath,
	   `${ocrViewerTtsTextFilePath}`
	);
	let extraSettingMapStr = [
		`transMode=${onEnglish}`,
		`onTrack=${onTrack}`,
		`speed=${Speed}`,
		`pitch=${Pitch}`,
	].join("|");
	jsTextToSpeech.speech(
	    playListFilePath,
	    extraSettingMapStr,
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
		+ ` \"${currentScriptName}\"`
		+ ` 2>&1`
	);
};


function extendCheckInputPath(
	inputPath
){
	let noConvertExtends = ["txt", "csv", "tsv"];
	const disableConvert = jsPath.checkExtend(
		inputPath,
		noConvertExtends.join("\t")
	);
	if(
		!disableConvert
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

function moveToOldForExcludePdfOrImage(){
	let enableExtendList = ["txt", "csv", "tsv"];
	const enableMove = jsPath.checkExtend(
		ocrTargetPath,
		enableExtendList.join("\t")
	);
	if(
		enableMove
	) {
		jsFileSystem.copyFile(
			ocrTargetPath,
			ocrViewerTtsTextFilePath
		);
		return;
	};
	const noExtend = !ocrTargetPath.match(
		/\.[a-zA-Z0-9]*$/
	);
	if(
		noExtend
	) {
		jsFileSystem.copyFile(
			ocrTargetPath,
			ocrViewerTtsTextFilePath
		);
		return;
	};
};

function exitWhenNoExtract(){
	const isOldExtracted = judgeAlreadyExtract();
	if(isOldExtracted) return;
	const howExtract = confirm(
		`no extracted, so extracting ok?`
	);
	if(!howExtract) return;
	saveExtractTextByOcr();
	exitZero();
};

function blankCheck(){
	if(
		ocrTargetPath
	) return;
	alert(
		`"ocrTargetPath" must be set by path`
	);
	exitZero();
};
