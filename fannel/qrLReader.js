

/// LABELING_SECTION_START
// # qrLReader.js
// ----------------

// Scan qr code on long press @puutaro
// ## Support long press menu
// ---------

// | type | enable |
// | ----- | ----- |
// | src anchor | x |
// | src image anchor | o |
// | image | o |

/// LABELING_SECTION_END


/// SETTING_SECTION_START
onUpdateLastModify="OFF"
onUrlHistoryRegister="OFF"
scriptFileName="qrLReader.js"
/// SETTING_SECTION_END


/// Please write bellow with javascript


const targetUrl = "CMDCLICK_LONG_PRESS_LINK_URL";



const cmdClickRootDir = "${00}";
const tempDownloadDirPath = 
	`${cmdClickRootDir}/temp/download`;

viewForMenu();

function viewForMenu(){

	const cmdclickLongPressImageUrlStr = "CMDCLICK_ENCRPT_LONG_PRESS_IMAGE_URL".replace(
		"_ENCRPT",
		""
	);
	const cmdclickLongPressLinkUrl = 
		"CMDCLICK_LONG_PRESS_IMAGE_URL";
	if(
		cmdclickLongPressLinkUrl == cmdclickLongPressImageUrlStr
	) {
		jsToast.short("Launch from long press");
		exitZero();
	};
	jsToast.short("scan..");
	const downloadQrImageName = getQrImageAndPath(
		cmdclickLongPressLinkUrl
	);
	const downloadImagePath = `${tempDownloadDirPath}/${downloadQrImageName}`;
	jsQr.scanConfirmHandler(downloadImagePath);
	exitZero();
};


function getQrImageAndPath(
	urlStr,
){
	jsCurl.getImage(
		urlStr
	);
	const downloadQrImageName = jsFileSystem.showFileList(
		tempDownloadDirPath
	).split("\t").at(0);
	if(!downloadQrImageName) {
		alert("no exist");
		exitZero();
	};
	return downloadQrImageName;
};
