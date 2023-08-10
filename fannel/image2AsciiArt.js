

/// LABELING_SECTION_START
// image to ascii art by web image long press  @puutaro
// * Support long press menu
//  - src image anchor
//  - image
// * PLAY_QUIZ
// 	-> A quiz to guess what kind of image ascii art is
// * DISPLAY_GALLERY
// 	-> display gallery
// * convertImageFile2Ascii
// 	-> convert image file to ascii art
// 	 file: 
// 		select image file
// 	 To:
// 		convert
// * TARGET_DIR
// 	-> src image file included dir
// * MOVE_OR_DELETE_IMAGE
// 	-> move or delete image file 
// * EDIT_TARGET_DIR_NAME
// 	-> rename or delete TARGET_DIR
// 	
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
setReplaceVariables="file://${01}/${001}/settingVariables/setReplaceVariables.js"
setVariableTypes="file://${01}/${001}/settingVariables/setVariableTypes.js"
hideSettingVariables="file://${01}/${001}/settingVariables/hideSettingVariables.js"
scriptFileName="image2AsciiArt.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
PLAY_QUIZ=""
DISPLAY_GALLERY=""
convertImageFile2Ascii=""
TARGET_DIR="default"
MOVE_OR_DELETE_IMAGE="ascii"
EDIT_TARGET_DIR_NAME=""
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript


let args = jsArgs.get().split("\t");
var viewMode = args.at(0);
jsFileSystem.createDir(
	"${image2AsciiArtGalleryDirPath}"
);
jsFileSystem.createDir(
	"${image2AsciiArtTempDirPath}"
);
const cmdClickRootDir = "${00}";
const tempDownloadDirPath = 
	`${cmdClickRootDir}/temp/download`;
const TXT_EXTEND = ".txt";
const HTML_EXTEND = ".html";
const defaultTargetDirName = "default";
const defaultTargetDirPath = `${image2AsciiArtGalleryDirPath}/${defaultTargetDirName}`;
jsFileSystem.createDir(
	defaultTargetDirPath
);
const pastTargetDir = TARGET_DIR;
TARGET_DIR = decideTargetDirName();
updateByVariableWhenDiff(
	"TARGET_DIR",
	TARGET_DIR,
	pastTargetDir,
);
jsListSelect.updateListFileCon(
	"${image2AsciiArtTargetDirListFilePath}",
	TARGET_DIR
);
const targetDirPath = 
	`${image2AsciiArtGalleryDirPath}/${TARGET_DIR}`;
jsFileSystem.createDir(
	targetDirPath
);
jsFileSystem.createDir(
	"${image2AsciiArtListDirPath}"
);
let DialogMessage = {
	convertAsciiArt: "ascii art",
	quizAsciiArt: "what kind of image?",
};
let AsciiOrImage = {
	ascii: "ascii",
	image: "image",
};
viewForMenu();
switcher();


function switcher(){
	switch(viewMode){
		case "":
			break;
		case "${playQuizMode}":
			execQuiz();
			break;
		case "${convertImageFile2Ascii}":
			execConvertImageFile2Ascii();
			break;
		case "${removeImage}":
			execRemoveImage();
			break;
		case "${EDIT_TARGET_DIR_NAME}":
			execEditTargetDirName();
		case "${MOVE_OR_DELETE_IMAGE}":
			execMoveOrDeleteImage();
		case "${DISPLAY_GALLERY}":
			execDisplayGallery();
	};
};


function decideTargetDirName(){
	if(
		!TARGET_DIR
	) return defaultTargetDirName;
	if(
		viewMode == "${playQuizMode}"
		|| viewMode == "${EDIT_TARGET_DIR_NAME}"
		|| viewMode == "${MOVE_OR_DELETE_IMAGE}"
	) return TARGET_DIR;
	return defaultTargetDirName;
};

function execConvertImageFile2Ascii(){
	const srcImageFilePath = convertImageFile2Ascii;
	if(!convertImageFile2Ascii){
		alert("select image file");
		exitZero();
	};
	jsListSelect.updateListFileCon(
		"${image2AsciiArtCatchImagePathListFilePath}",
		srcImageFilePath
	);
	const destiImageFileName = 
		jsPath.basename(srcImageFilePath);
	const destiImageFilePath = 
		`${defaultTargetDirPath}/${destiImageFileName}`;
	jsFileSystem.copyFile(
		srcImageFilePath,
		destiImageFilePath
	);
	jsDialog.asciiArtDialog(
		DialogMessage.convertAsciiArt,
		destiImageFilePath
	);
	exitZero();
};


function execQuiz(){
	const asciiArtFileListCon = jsFileSystem.showFileList(
		targetDirPath
	);
	const asciiArtFileList = asciiArtFileListCon.split("\t");
	const asciiArtFileListLength = asciiArtFileList.length;
	var asciiFileName = "";
	var asciiFileRawName = "";
	let image2QuizRndTempFileConList = jsFileSystem.readLocalFile(
		"${image2AsciiArtQuizRndTempFilePath}"
	).split("\n");
	var tempImageFilePathCon = image2QuizRndTempFileConList.at(0);
	if(!tempImageFilePathCon) tempImageFilePathCon = "";
	var tempQuizIndexCon = image2QuizRndTempFileConList.at(1);
	if(!tempQuizIndexCon) tempQuizIndexCon = "";
	if(
		tempImageFilePathCon != asciiArtFileListCon
	){
		tempImageFilePathCon = "";
		tempQuizIndexCon = "";
	};
	while(true){
		const substituteIndex = Math.floor( 
			Math.random() * asciiArtFileListLength 
		);
		const isContinue = judgeContinueByRnd(
			asciiArtFileListCon,
			tempImageFilePathCon,
			tempQuizIndexCon,
			substituteIndex,
			asciiArtFileListLength,
		);
		if(isContinue) continue;
		asciiFileName = asciiArtFileList.at(
			substituteIndex
		);
		break;
	};
	const imagePath = `${targetDirPath}/${asciiFileName}`;
	jsDialog.asciiArtDialog(
		DialogMessage.quizAsciiArt,
		imagePath
	);
	jsDialog.imageDialog(
		"answer image",
		imagePath
	);
	exitZero();
};

function judgeContinueByRnd(
	asciiArtFileListCon,
	tempImageFilePathCon,
	tempQuizIndexCon,
	substituteIndex,
	asciiArtFileListLength,
){
	if(
		!tempImageFilePathCon
	) {
		jsFileSystem.writeLocalFile(
			`${image2AsciiArtQuizRndTempFilePath}`,
			`${asciiArtFileListCon}\n${substituteIndex}`
		);
		return false;
	};
	if(
		!tempQuizIndexCon
	) {
		jsFileSystem.writeLocalFile(
			`${image2AsciiArtQuizRndTempFilePath}`,
			`${asciiArtFileListCon}\n${substituteIndex}`
		);
		return false;
	};
	const limitLength = (asciiArtFileListLength * 2) / 3; 
	let tempQuizIndexConList = tempQuizIndexCon.split("\t");
	let tempQuizIndexConListLength = tempQuizIndexConList.length;
	if(
		tempQuizIndexConListLength >= limitLength
	) {
		jsFileSystem.writeLocalFile(
			`${image2AsciiArtQuizRndTempFilePath}`,
			`${asciiArtFileListCon}\n${substituteIndex}`
		);
		return false;
	};
	const isIndexInclude = tempQuizIndexConList.filter(
			function(numIndex){
				return numIndex == substituteIndex
		}).length > 0;
	if(
		!isIndexInclude
	) {
		jsFileSystem.writeLocalFile(
			`${image2AsciiArtQuizRndTempFilePath}`,
			`${asciiArtFileListCon}\n${tempQuizIndexCon}\t${substituteIndex}`
		);
		return false;
	};
	return true;
};


function viewForMenu(){
	const cmdclickLongPressImageUrlStr = "CMDCLICK_ENCRPT_LONG_PRESS_IMAGE_URL".replace(
		"_ENCRPT",
		""
	);
	const cmdclickLongPressLinkUrl = 
		"CMDCLICK_LONG_PRESS_IMAGE_URL";
	if(
		cmdclickLongPressLinkUrl == cmdclickLongPressImageUrlStr
	) return;
	jsToast.short("create..");
	const downloadImageName = getImageAndPath(
		cmdclickLongPressLinkUrl
	);
	const downloadImagePath = `${tempDownloadDirPath}/${downloadImageName}`;
	const galleryImagePath = `${targetDirPath}/${downloadImageName}`;
	jsFileSystem.copyFile(
		downloadImagePath,
		galleryImagePath
	);
	jsDialog.asciiArtDialog(
      	DialogMessage.convertAsciiArt,
   		galleryImagePath
    );
	exitZero();
};


function saveAsciiSrcUrl(
	downloadImageRawName,
	cmdclickLongPressLinkUrl
){
	const urlSaveSrcUrlFileName = 
		`${downloadImageRawName}${TXT_EXTEND}`;
	let isSrcUrlFileInclude = jsFileSystem.showFileList(
		"${image2AsciiArtSrcUrlDirPath}"
	).split("\t").filter(
		function(fileName){
			return fileName.startsWith(downloadImageRawName);
		}).length > 0;
	if(isSrcUrlFileInclude) return;
	jsFileSystem.writeLocalFile(
		`${image2AsciiArtSrcUrlDirPath}/${urlSaveSrcUrlFileName}`,
		cmdclickLongPressLinkUrl
	);
};

function getImageAndPath(
	urlStr,
){
	jsCurl.getImage(
		urlStr
	);
	const downloadImageName = jsFileSystem.showFileList(
		tempDownloadDirPath
	).split("\t").at(0);
	if(!downloadImageName) {
		alert("no exist");
		exitZero();
	};
	return downloadImageName;
};


function execDisplayGallery(){
	const selectedImagePath = 
		displayGralleryAndSelectImagePath();
	jsDialog.asciiArtDialog(
		DialogMessage.convertAsciiArt,
		selectedImagePath
	);
	exitZero();
};

function displayGralleryAndSelectImagePath(
){
	const asciiArtFileListCon = jsFileSystem.showFileList(
		targetDirPath
	).split("\t").map(
		function(fileName){
			return `${targetDirPath}/${fileName}`;
		}).join("\t");
	if(
		!asciiArtFileListCon
	) exitZero();
	return jsDialog.onlyImageGridDialog(
	        "Select image",
	        "",
	        asciiArtFileListCon
	   );
};


function execMoveOrDeleteImage(){
	const moveOrDeleteValue = jsEdit.getFromEditText(
		"MOVE_OR_DELETE_IMAGE"
	);
	if(!moveOrDeleteValue) return;
	const moveDestiDirName = 
		returnMoveDestiDirName();
	if(
		moveDestiDirName == TARGET_DIR
	){
		alert(
			`moveDestiDirName is same TARGET_DIR\n : ${TARGET_DIR}`
		);
		exitZero();
		return;
	};
	const selectedItems = returnMoveOrDeleteEntryFiles(
		moveOrDeleteValue,
		moveDestiDirName
	);
	if(!selectedItems) exitZero();
	let selectedItemsList = selectedItems.split("\t");
	moveOrDeleteHandler(
		moveDestiDirName,
		selectedItemsList
	);
	exitZero();
};

function moveOrDeleteHandler(
	moveDestiDirName,
	selectedItemsList
){
	const isDelete = !moveDestiDirName;
	if(isDelete){
		selectedItemsList.forEach(
			function(imageFilePath){
				jsFileSystem.removeFile(
					imageFilePath
				);
			});
		jsToast.short("remove ok");
		exitZero();
		return;
	};
	const moveDestiDirPath = 
	`${image2AsciiArtGalleryDirPath}/${moveDestiDirName}`;
	jsFileSystem.createDir(moveDestiDirPath);
	let destiItemsPathList = selectedItemsList.map(
		function(imageFilePath){
			const imageName = jsPath.basename(imageFilePath);
			return `${moveDestiDirPath}/${imageName}`;
		});
	selectedItemsList.forEach(
			function(imageFilePath, index){
				jsFileSystem.copyFile(
					imageFilePath,
					destiItemsPathList[index]
				);
				jsFileSystem.removeFile(
					imageFilePath,
				);
			});
	jsToast.short("move ok");
	exitZero();
};

function returnMoveOrDeleteEntryFiles(
	moveOrDeleteValue,
	moveDestiDirName
){
	const asciiArtFileListCon = jsFileSystem.showFileList(
		targetDirPath
	).split("\t").map(
		function(fileName){
			return `${targetDirPath}/${fileName}`;
		}).join("\t");
	var selectecItems = [];
	const deleteOrMoveDialogMassage = makeDeleteOrMoveDialogMessage(
		moveDestiDirName
	);
	switch(moveOrDeleteValue){
		case AsciiOrImage.ascii:
			return jsDialog.multiSelectSpannableGridDialog(
				deleteOrMoveDialogMassage,
		      "",
		      asciiArtFileListCon
			);
			break;
		case AsciiOrImage.image:
			return jsDialog.multiSelectOnlyImageGridDialog(
				deleteOrMoveDialogMassage,
		      "",
		      asciiArtFileListCon
			);
			break;
	};
	return "";
};

function makeDeleteOrMoveDialogMessage(
	moveDestiDirName
){
	const isDelete = !moveDestiDirName;
	if(
		isDelete
	) return `Select delete images:\n ${TARGET_DIR}`;
	return `Select move images:\n ${TARGET_DIR} -> ${moveDestiDirName}`;
};


function returnMoveDestiDirName(){
	const moveDestiDir = "moveDestiDir";
	const returnValue = jsDialog.formDialog(
		`Select move dir: srcDir ${TARGET_DIR}`,
		`moveDestiDir:TXT:FSB=${FCB_DIR_PATH}=${image2AsciiArtGalleryDirPath}!${FCB_TYPE}=dir`,
		`moveDestiDir=`,
	);
	if(!returnValue) exitZero();
	return jsDialog.getFormValue(
		moveDestiDir,
		returnValue.replaceAll("\n", "\t"),
	);
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
		"${FANNEL_SCRIPT_PATH}",
	    tergetVariableName,
	    currentVariableValue
	);
};


function execEditTargetDirName(){
	jsDirSelect.execEditDirName(
		"TARGET_DIR",
		"RENAME_TARGET_DIR",
		"${image2AsciiArtGalleryDirPath}",
		`TARGET_DIR:TXT:FSB=${FCB_DIR_PATH}=${image2AsciiArtGalleryDirPath}!${FCB_TYPE}=dir`,
		`TARGET_DIR=${TARGET_DIR}\tRENAME_TARGET_DIR=`,
		"${01}/${02}",
		"Edit TARGET_DIR"
	);
	let currentDirList = jsFileSystem.showDirList(
		"${image2AsciiArtGalleryDirPath}"
	).split("\t");
	let targetDirConList = jsFileSystem.readLocalFile(
		"${image2AsciiArtTargetDirListFilePath}"
	).split("\n").filter(function(dirName){
		return currentDirList.includes(dirName);
	});
	let newDirList = currentDirList.filter(function(dirName){
		return !targetDirConList.includes(dirName);
	});
	let updateDirList = newDirList.concat(targetDirConList);
	jsFileSystem.writeLocalFile(
		"${image2AsciiArtTargetDirListFilePath}",
		updateDirList.join("\n")
	);
};
