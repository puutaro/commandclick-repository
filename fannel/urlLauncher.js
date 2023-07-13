

/// LABELING_SECTION_START
// Url Launcher @puutaro
//  --
//  --
// bellow setting variable main line up
// * onUrlHistoryRegister
//   -> url history update signal
//  - ON: update
//  - OFF: no update
// * onAdBlock
// 	 -> adblock switch
//  - INHERIT: inherit config setting
//  - ON: on
//  - OFF: off
// * terminalFontZoom 
//  -> adjust terminal font size (percentage)
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
onUrlHistoryRegister="OFF"
onAdBlock="INHERIT"
terminalFontZoom="130"
setReplaceVariables="file://${01}/${001}/settingVariables/setReplaceVariables.js"
setVariableTypes="file://${01}/${001}/settingVariables/setVariableTypes.js"
hideSettingVariables="file://${01}/${001}/settingVariables/hideSettingVariables.js"
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
