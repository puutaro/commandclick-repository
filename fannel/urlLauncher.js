

/// LABELING_SECTION_START
// Url Launcher @puutaro
// bellow setting variable main line up
// * EditExecute is edit mode change
//	- NO is normal edit
//	- ONCE is one time edit and execute
//	- ALWAYD is always edit and execute
// * terminalSizeType is cmdclick terminal size option
//  - OFF: no adjust (default)
//  - LONG: LongSize
//  - SHORT: ShortSize
// * terminalFontZoom adjust terminal font size (percentage)
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
onUrlHistoryRegister="OFF"
terminalFontZoom="130"
setVariableType="LAUNCH_URL:LCB=${01}/urlLauncherDir/launchUrlList"
setVariableType="REMOVE_LAUNCH_URL:LCBB=${01}/urlLauncherDir/launchUrlList|jsf '${0}' REMOVE_LAUNCH_URL"
scriptFileName="cmdGpt35.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
LAUNCH_URL=""
REMOVE_LAUNCH_URL=""
/// CMD_VARIABLE_SECTION_END



/// Please write bellow with shell script


let args = jsArgs.get().split("\t");
const firstArgs = args.at(0);
const REQ_LIST_DIR_PATH = "${01}/urlLauncherDir";
const LAUNCH_URL_LIST_FILE_PATH = `${REQ_LIST_DIR_PATH}/launchUrlList`;
const REQ_LIST_FILE_PATH = `${REQ_LIST_DIR_PATH}/reqList`;
const normalArg = "";
const removeLaunchUrlArg = "REMOVE_LAUNCH_URL";
const escapeCharHyphen = "-";


switch(firstArgs){
	case normalArg:
		updateListFileCon(
			REQ_LIST_DIR_PATH,
			LAUNCH_URL_LIST_FILE_PATH,
			LAUNCH_URL
		);
		execUrlLaunch();
		break;
	case removeLaunchUrlArg:
		removeFromList(
			REQ_LIST_DIR_PATH,
			LAUNCH_URL_LIST_FILE_PATH,
			LAUNCH_URL
		);
		break;
};


function execUrlLaunch(){
	jsUrl.loadUrl(LAUNCH_URL);
};


function updateListFileCon(
	searchListDirPath,
	searchListFilePath,
	searchText
){
	let currentListCons = readWithHyphenCheck(
		searchListDirPath,
		searchListFilePath,
		searchText
	);
	if(
		currentListCons.length === 0
	) return;
	const inInclude = currentListCons.find(
		function(req){
			return req.trim() === searchText;
		}
	);
	if(inInclude) return;
	const updateListConSource = searchText + 
		"\n" + 
		jsFileSystem.readLocalFile(
			searchListFilePath
		);
	const updateListCon = updateListConSource
		.split("\n")
		.filter(
			function(req){
				const trimReq = req.trim();
				return trimReq !== "" 
					&& trimReq !== escapeCharHyphen;
			}
		).join("\n");
	jsFileSystem.writeLocalFile(
        searchListFilePath,
        updateListCon
	);
};

function removeFromList(
	searchListDirPath,
	searchListFilePath,
	searchText
){
	let currentListCons = readWithHyphenCheck(
		searchListDirPath,
		searchListFilePath,
		searchText
	);
	if(
		currentListCons.length === 0
	) return;
	const trimRequest = searchText.trim();
	const inInclude = currentListCons.find(
		function(req){
			return req.trim() === trimRequest;
		}
	);
	if(!inInclude) {
		jsToast.short(`no exist: ${searchText}`);
		return;
	};
	const updateListCon = jsFileSystem.readLocalFile(
		searchListFilePath
	)
		.split("\n")
		.filter(
			function(req){
				const trimReq = req.trim();
				return trimReq !== "" 
					&& trimReq !== escapeCharHyphen
					&& trimReq !== trimRequest;
			}
		).join("\n");
	jsFileSystem.writeLocalFile(
        searchListFilePath,
        updateListCon
	);
	jsIntent.launchShortcut(
        "${01}",
        "${02}"
    );
};


function readWithHyphenCheck(
	searchListDirPath,
	searchListFilePath,
	searchText
){
	jsFileSystem.createDir(
		searchListDirPath
	);
	let currentListCons = jsFileSystem.readLocalFile(
			searchListFilePath
		).split("\n");
	const trimSearchText = searchText.trim();
	if(
		trimSearchText == escapeCharHyphen
	) {
		return [];
	};
	return currentListCons;
};
