

/// LABELING_SECTION_START
// # shareImage.js
// ----------------

// Share web image for long press menu  @puutaro
// ## Support long press menu
// ---------

// | type | enable |
// | ----- | ----- |
// | src anchor | x |
// | src image anchor | x |
// | image | o |

/// LABELING_SECTION_END

/// SETTING_SECTION_START
onUpdateLastModify="OFF"
disableSettingValsEdit="ON"
/// SETTING_SECTION_END

/// Please write bellow with javascript


let args = jsArgs.get().split("\t");
var viewMode = args.at(0);
const cmdClickRootDir = "${00}";
const tempDownloadDirPath = 
	`${cmdClickRootDir}/temp/download`;
const cmdclickLongPressLinkUrl = 
	"${LONG_PRESS_IMAGE_URL}";

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
	const cmdclickLongPressImageUrlStr = "${ENCRPT_LONG_PRESS_IMAGE_URL}".replace(
		"ENCRPT_",
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
