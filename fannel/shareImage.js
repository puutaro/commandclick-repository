

/// LABELING_SECTION_START
// share web image for long press menu  @puutaro
// * Support long press menu
//  - image
/// LABELING_SECTION_END

/// SETTING_SECTION_START
onUpdateLastModify="OFF"
/// SETTING_SECTION_END

/// Please write bellow with javascript


let args = jsArgs.get().split("\t");
var viewMode = args.at(0);
const cmdClickRootDir = "${00}";
const tempDownloadDirPath = 
	`${cmdClickRootDir}/temp/download`;
const cmdclickLongPressLinkUrl = 
	"CMDCLICK_LONG_PRESS_IMAGE_URL";

judgeExit();
execShare();

function execShare(){
	const getImageName = getImageAndPath(
		cmdclickLongPressLinkUrl
	);
	const getImagePath = `${tempDownloadDirPath}/${getImageName}`;
	jsIntent.shareImage(
		getImagePath
	);
};


function judgeExit(){
	const cmdclickLongPressImageUrlStr = "CMDCLICK_ENCRPT_LONG_PRESS_IMAGE_URL".replace(
		"_ENCRPT",
		""
	);
	if(
		cmdclickLongPressLinkUrl == cmdclickLongPressImageUrlStr
	) exitZero();
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
