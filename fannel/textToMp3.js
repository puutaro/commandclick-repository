

/// LABELING_SECTION_START
// Advanced csv & tsv viewer @puutaro
// 	* inputCTsvPath 
// 		-> set csv or tsv path
// 	* scrollBoost 
// 		-> auto scroll boost rate
//		- 0: one step
//		- 1: spedify direction range step
//		- other: specifyDirectStartNum + 1 + specifyDirectRange * scrollBoost;
// 	* colRange 
//		-> view column range num
//  * rowRange
// 		-> view row range num
// 	* startColNum 
//		-> start column index
// 	* startRowNum 
//		-> start row index
// 	* autoScrollType
//		-> auto scroll direction
//		horizon: left to right
//		rHorizon: right to left
//		vartical: top to bottom
//		rVartical: bottom to top
// 	* viewType 
//		SRC: src csv or tsv
//		AGGRE: aggregated table
//		CHART: aggregated chart
//  * rowLimit 
// 		-> view row limit 
//		(more smaller this value, more shoter reading speed up)
//  * filters
// 		-> filter query
//  	in: by included word
// 		>=: by equal larger
// 		>: by larger
// 		<=: by equal smaller
// 		>: by smaller
// 		=: by equal
//	* html description 
//   maxW 
// 		-> maximum frequent word
//   sumMaxW
// 		-> count maximum frequent word
//   minW
// 		-> minimum frequent word
//   sumMinW
//   	-> count minimum frequent word
//   avrW
// 		-> middle frequent word
//   sumAvrW
// 		-> count middle frequent word
// 
// - This Fannel is used to bellow repo.
// 		https://github.com/chartjs/Chart.js
// --
// --
// bellow setting variable main line up
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
// * terminalFontZoom adjust terminal font size (percentage)
// * terminalFontColor adjust terminal font color
// * terminalColor adjust terminal background color
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
terminalOutputMode="NORMAL"
onUpdateLastModify="ON"
onUrlHistoryRegister="OFF"
terminalFontZoom="0"
terminalColor=""
terminalFontColor=""
setReplaceVariables="BTN_CMD=cmd"
setReplaceVariables="BTN_LABEL=label"
setReplaceVariables="LIST_PATH=listPath"
setReplaceVariables="LIMIT_NUM=limitNum"
setReplaceVariables="PARRENT_DIR_PATH=${01}"
setReplaceVariables="CURRENT_APP_DIR_PATH=${PARRENT_DIR_PATH}/${001}"
setReplaceVariables="CURRENT_LIST_DIR_PATH=${CURRENT_APP_DIR_PATH}/list"
setReplaceVariables="TXT_FILE_LIST_PATH=${CURRENT_LIST_DIR_PATH}/fileList"
setReplaceVariables="LANG_LIST_PATH=${CURRENT_LIST_DIR_PATH}/langList"
setReplaceVariables="OUT_DIR_LIST_PATH=${CURRENT_LIST_DIR_PATH}/outDirList"
setReplaceVariables="GMAIL_LIST_PATH=${CURRENT_LIST_DIR_PATH}/gmailList"
setReplaceVariables="CAT_FILE_LIST_PATH=${CURRENT_LIST_DIR_PATH}/catList"
setReplaceVariables="MOVE_DIR_LIST_PATH=${CURRENT_LIST_DIR_PATH}/moveDirList"
setReplaceVariables="TEMP_DIR_PATH=${CURRENT_APP_DIR_PATH}/tmp"
setVariableTypes="fileToMp3:ELCBFLB=${LIST_PATH}=${TXT_FILE_LIST_PATH}!${LIMIT_NUM}=20|${BTN_CMD}=jsf '${0}' fileToMp3"
setVariableTypes="outDir:ELCBDIR=${LIST_PATH}=${OUT_DIR_LIST_PATH}!${LIMIT_NUM}=10"
setVariableTypes="lang:ELCBDIR=${LIST_PATH}=${LANG_LIST_PATH}!${LIMIT_NUM}=10"
setVariableTypes="gmailToMp3:ELCB=${LIST_PATH}=${GMAIL_LIST_PATH}!${LIMIT_NUM}=10"
setVariableTypes="catFile:ELCBB=${LIST_PATH}=${CAT_FILE_LIST_PATH}|${BTN_CMD}=jsf '${0}' catFile!cat"
setVariableTypes="rmFile:ELCBB=${LIST_PATH}=${CAT_FILE_LIST_PATH}|${BTN_CMD}=jsf '${0}' rmFile!del"
setVariableTypes="mvFile:ELCBDIRB=${LIST_PATH}=${MOVE_DIR_LIST_PATH}!${LIMIT_NUM}=10|${BTN_CMD}=jsf '${0}' mvFile!${BTN_LABEL}=mv"
setVariableTypes="onlySync:CB=ON!OFF"
setVariableTypes="install:BTN=${BTN_CMD}=jsf '${0}' install"
scriptFileName="textToMp3.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
fileToMp3=""
webToMp3=""
gmailToMp3=""
clipToMp3=""
outDir="/storage/emulated/0/Music/test"
catFile=""
rmFile=""
mvFile="/storage/emulated/0/Music/test"
onlySync="OFF"
lang="ja"
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript


let args = jsArgs.get().split("\t");
const FIRST_ARGS = args.at(0);
const SECOND_ARGS = args.at(1);
let MODE_ARGS_ENUM = {
	fileToMp3: 'fileToMp3',
	webToMp3: 'webToMp3',
    gmailToMp3 : '',
    clipToMp3 : 'clipToMp3',
    catFile : 'catFile',
    rmFile : 'rmFile',
    mvFile: 'mvFile',
};
const PARRENT_DIR_PATH = "${PARRENT_DIR_PATH}";
const CURRENT_APP_DIR_PATH = "${CURRENT_APP_DIR_PATH}";
const FANNEL_SCRIPT_PATH = "${01}/${02}";
// const SHELL_DIR_PATH = `${CURRENT_APP_DIR_PATH}/sh`;
// const FILE_TO_MP3_SHELL_PATH = `${SHELL_DIR_PATH}/fileToMp3.sh`;
const CAT_FILE_DIR_PATH = `${outDir}/txt`;
const MP3_EXTEND = ".mp3";
const TXT_EXTEND = ".txt";
const TXT_DIR_NAME = "txt";
const TMP_DIR_NAME = "temp";
argsHandler();


function argsHandler(){
	stopRequireByVar();
	initSetting();
	switch(FIRST_ARGS){
		case MODE_ARGS_ENUM.gmailToMp3:
			execGmailToMp3();
			break;
		case MODE_ARGS_ENUM.fileToMp3:
			execFileToMp3();
			break;
		case MODE_ARGS_ENUM.webToMp3:
			break;
		case MODE_ARGS_ENUM.clipToMp3:
			break;
		case MODE_ARGS_ENUM.catFile:
			execCatFile();
			break;
		case MODE_ARGS_ENUM.rmFile:
			execRmFile();
			break;
		case MODE_ARGS_ENUM.install:
			execInstall();
			break;
		case MODE_ARGS_ENUM.mvFile:
			execMvFile();
			break;
	};
};


function execFileToMp3(){
	updateCatFileCon(
		fileToMp3
	);
	jsListSelect.updateListFileCon(
		"${TXT_FILE_LIST_PATH}",
		fileToMp3,
	);
	saveMp3(fileToMp3);
	// cmdIntent.run(
	// 	`bash  \"${FILE_TO_MP3_SHELL_PATH}\" `
	// 	+ ` \"${outDir}\"`
	// 	+ ` \"${fileToMp3}\"`
	// 	+ ` \"${onlySync}\"`
	// 	+ ` \"${lang}\"`
	// );
};


// function execInstall(){
// 	const installShellPath = `${SHELL_DIR_PATH}/install.sh`;
// 	cmdIntent.run(
// 		`bash  \"${installShellPath}\"`
// 	);
// };


function execGmailToMp3(){
	jsListSelect.updateListFileCon(
		"${GMAIL_LIST_PATH}",
		gmailToMp3,
	);
	const currentUrl = window.location.href;
	if(
		!currentUrl.startsWith("https://mail")
	) {
		jsUrl.loadUrl(gmailToMp3);
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
	const sourcePath = `${TEMP_DIR_PATH}/${catFileName}`;
	jsFileSystem.writeLocalFile(
		`${TEMP_DIR_PATH}/${title}${TXT_EXTEND}`,
		`${body}`,
	);
	updateCatFileCon(
		catFileName
	);
	saveMp3(sourcePath);
	// cmdIntent.run(
	// 	`bash  \"${FILE_TO_MP3_SHELL_PATH}\" `
	// 	+ ` \"${outDir}\"`
	// 	+ ` \"${sourcePath}\"`
	// 	+ ` \"${onlySync}\"`
	// 	+ ` \"${lang}\"`
	// );
};


function execCatFile() {
	const catCon = jsFileSystem.readLocalFile(
		`${CAT_FILE_DIR_PATH}/${catFile}`,
	);
	alert(catCon + "--");
};


function execRmFile(){
	const removeTxtPath = `${CAT_FILE_DIR_PATH}/${rmFile}`;
	const onDelete = confirm(
		`delete ok?\n ${removeTxtPath}`
	);
	if(!onDelete) return;
	const removeMp3FilePath = jsPath.removeExtend(
        removeTxtPath,
        ".mp3"
    );
	jsFileSystem.removeFile(
		removeTxtPath
	);
	jsFileSystem.removeFile(
		removeMp3FilePath
	);
	jsEdit.updateByVariable(
		FANNEL_SCRIPT_PATH,
        "catFile",
        catFile,
	);
	jsEdit.updateByVariable(
		FANNEL_SCRIPT_PATH,
        "rmFile",
        rmFile
	);
	
	jsListSelect.wrapRemoveItemInListFileCon(
        "${CAT_FILE_LIST_PATH}",
        rmFile,
        FANNEL_SCRIPT_PATH,
        "catFile",
        "rmFile",
    );
};

function replaceSimble(
	targetStr
){
	let exp = /[-A-Z0-9+&@#\/&#37;?=~_|!:,.;＃＄％＆（）＝〜＾｜￥｛｝。、＜＞＊]/ig;
	return targetStr.replaceAll(exp, "");
};


function initSetting(){
	jsFileSystem.createDir(
		outDir
	);
	jsFileSystem.createDir(
		"${TEMP_DIR_PATH}"
	);
	jsListSelect.updateListFileCon(
		"${LANG_LIST_PATH}",
		lang,
	);
	jsListSelect.updateListFileCon(
		"${OUT_DIR_LIST_PATH}",
		outDir,
	);
	jsListSelect.updateListFileCon(
		"${OUT_DIR_LIST_PATH}",
		mvFile,
	);
};

function updateCatFileCon(
	insertItem
){
	const catFileList = jsFileSystem.showFileList(
		CAT_FILE_DIR_PATH
	).split("\t").reverse();
	const fileToMp3Base = jsPath.compExtend(
		insertItem.split("/").at(-1),
		TXT_EXTEND
	);
	const updateCatFileList = [fileToMp3Base].concat(
		catFileList.filter(
			function(el){
				return el != fileToMp3Base
		})
	).join("\n");
	if(catFileList){
		jsFileSystem.writeLocalFile(
			"${CAT_FILE_LIST_PATH}",
			updateCatFileList,
		);
	};
};

function execMvFile(){
	if(!mvFile) {
		alert(`move detination dir must be specify`);
		exitZero();
	};
	jsListSelect.updateListFileCon(
		"${MOVE_DIR_LIST_PATH}",
		mvFile,
	);
	const moveFileNameKeyValue = jsDialog.formDialog(
		"Move select move file",
		`mp3File:EFCB=dirPath=${outDir}!suffix=${MP3_EXTEND}!type=file`,
		"mp3File="
	);
	if(!moveFileNameKeyValue) return;
	const moveFileNameSource = moveFileNameKeyValue
			.split("=")
			.slice(1)
			.join("=");
	const moveMp3Name = jsScript.bothQuoteTrim(
		moveFileNameSource
	);
	if(!moveMp3Name) return;
	const sourceMp3 = `${outDir}/${moveMp3Name}`;
	const destiMp3 = `${mvFile}/${moveMp3Name}`;
	moveFile(
		sourceMp3,
		destiMp3,
	);
	const txtFileName = jsPath.removeExtend(
		moveMp3Name,
		MP3_EXTEND
	) + TXT_EXTEND;
	const sourceTxt = `${outDir}/${TXT_DIR_NAME}/${txtFileName}`;
	const destiTxt = `${mvFile}/${TXT_DIR_NAME}/${txtFileName}`;
	moveFile(
		sourceTxt,
		destiTxt,
	);
	jsToast.short("move ok");
};


function stopRequireByVar(){
	switch(FIRST_ARGS){
		case MODE_ARGS_ENUM.install:
			return;
			break;
	};
	if(!outDir) {
		alert("\"outdir\" must be specify");
		exitZero();
	};
};


function moveFile(
	sourceFile,
	destiFile
){
	if(sourceFile == destiFile){
		alert(
			`both path same\n ${sourceFile}\n ${destiFile}`
		);
		exitZero();
	};
	const destiDirPath = jsPath.dirname(destiFile);
	alert(destiFile + "\n---" +  destiDirPath + "---");
	jsFileSystem.createDir(
		destiDirPath
	);
	return;
	jsFileSystem.copyFile(
		sourceFile,
		destiFile,
	);
	jsFileSystem.removeFile(
		sourceFile,
	);
};

// function saveMp3(
// 		sourcePath
// 	){
// 	const textContentSource = jsFileSystem.readLocalFile(
// 		sourcePath
// 	).replace("\n", " ");
// 	const textContent = textContentSource.substring(1, 3000);
// 	const atomicName = jsPath.trimAllExtend(
// 		jsPath.basename(sourcePath)
// 	);
// 	const saveTxtName =  atomicName + TXT_EXTEND;
// 	const saveTxtDirPath = `${outDir}/${TXT_DIR_NAME}`;
// 	const saveTxtPath = `${saveTxtDirPath}/${saveTxtName}`;
// 	jsFileSystem.createDir(
// 		saveTxtDirPath
// 	);
// 	jsToast.short("saveMp3");
// 	jsFileSystem.writeLocalFile(
// 		saveTxtPath,
// 		textContent
// 	);
// 	if(onlySync != "OFF") {
// 		jsToast.short("sync ok");
// 		return;
// 	};
// 	const saveMp3Name =  atomicName + MP3_EXTEND;
// 	const saveMp3Path = `${outDir}/${saveMp3Name}`;
// 	jsTextToSpeach.save(
// 		textContent, 
// 		saveMp3Path,
// 		"aaaaaa"
// 	);
// 	jsToast.short("created");
// };



function saveMp3(
		sourcePath
	){
	const textContent = jsFileSystem.readLocalFile(
		sourcePath
	);
	const atomicName = jsPath.trimAllExtend(
			jsPath.basename(sourcePath)
		);
	const saveTxtName =  atomicName + TXT_EXTEND;
	const saveTxtDirPath = `${outDir}/${TXT_DIR_NAME}`;
	const saveTxtPath = `${saveTxtDirPath}/${saveTxtName}`;
	jsFileSystem.createDir(
		saveTxtDirPath
	);
	jsFileSystem.writeLocalFile(
		saveTxtPath,
		textContent
	);

	if(onlySync != "OFF") {
		jsToast.short("sync ok");
		return;
	};
	jsTextToSpeech.save(
		textContent, 
		outDir,
    	atomicName
	);
	// const stringLength = textContent.length;
	// const LengthLimit = 3000;
	// const splitLength = Math.floor(stringLength / LengthLimit) + 1;
	// alert(`${splitLength} / ${stringLength}`);
	// const tempDirPath = `${outDir}/${TMP_DIR_NAME}`;
	// jsFileSystem.removeDir(tempDirPath);
	// jsFileSystem.createDir(tempDirPath);
	// for (let i = 0; i <= stringLength; i += LengthLimit) {
	// 	var splitTextContent = textContent.substring(i, i + LengthLimit);
	// 	// alert(`v  ${i}\n^---${splitTextContent}`);
	// 	var saveMp3TmpName =  `${atomicName}-${i}${MP3_EXTEND}`;
	// 	var saveMp3TmpPath = `${tempDirPath}/${saveMp3TmpName}`;
	// };
	jsToast.short("created");
};