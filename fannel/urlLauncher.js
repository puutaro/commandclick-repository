

/// LABELING_SECTION_START
// Url Launcher @puutaro
//  --
//  --
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
onAdBlock="INHERIT"
terminalFontZoom="130"
setReplaceVariable="BTN_CMD=cmd"
setReplaceVariable="BTN_LABEL=label"
setReplaceVariable="LIST_PATH=listPath"
setReplaceVariable="LIMIT_NUM=limitNum"
setReplaceVariable="SELECT_JS=selectJs"
setReplaceVariable="APP_DIR_PATH=${01}/${001}"
setReplaceVariable="URL_LIST_DIR_PATH=${APP_DIR_PATH}/list"
setReplaceVariable="APP_JS_PATH=${APP_DIR_PATH}/js"
setReplaceVariable="LAUNCH_URL_SELECTED_JS_PATH=${APP_JS_PATH}/display_siteSummary.js"
setReplaceVariable="URL_LIST_FILE_PATH=${URL_LIST_DIR_PATH}/launchUrlList"
setVariableType="LAUNCH_URL:ELCB=${LIST_PATH}=${URL_LIST_FILE_PATH}!${SELECT_JS}=${LAUNCH_URL_SELECTED_JS_PATH}"
setVariableType="REMOVE_LAUNCH_URL:ELCBB=${LIST_PATH}=${URL_LIST_FILE_PATH}|${BTN_CMD}=jsf '${0}' REMOVE_LAUNCH_URL!${BTN_LABEL}=del"
scriptFileName="urlLauncher.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
LAUNCH_URL=""
REMOVE_LAUNCH_URL=""
/// CMD_VARIABLE_SECTION_END



/// Please write bellow with shell script


let args = jsArgs.get().split("\t");
const firstArgs = args.at(0);
const APP_DIR_PATH = "${APP_DIR_PATH}";
const URL_LIST_DIR_PATH = "${URL_LIST_DIR_PATH}";
const LAUNCH_URL_LIST_FILE_PATH = "${URL_LIST_FILE_PATH}";
const normalArg = "";
const removeLaunchUrlArg = "REMOVE_LAUNCH_URL";
const escapeCharHyphen = "-";


switch(firstArgs){
	case normalArg:
		jsListSelect.updateListFileCon(
			LAUNCH_URL_LIST_FILE_PATH,
			LAUNCH_URL
		);
		execUrlLaunch();
		break;
	case removeLaunchUrlArg:
		jsListSelect.wrapRemoveItemInListFileCon(
			LAUNCH_URL_LIST_FILE_PATH,
			REMOVE_LAUNCH_URL,
			"${01}/${02}",
			"LAUNCH_URL",
			"REMOVE_LAUNCH_URL",
		);
		break;
};


function execUrlLaunch(){
	jsUrl.loadUrl(LAUNCH_URL);
};
