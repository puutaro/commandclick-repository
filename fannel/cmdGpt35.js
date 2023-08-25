

/// LABELING_SECTION_START
// GPT3.5 free client @puutaro

// Table of Contents
// -------
// <!-- vim-markdown-toc GFM -->
// * [Cmd Variables](#cmd-variables)
// 	* [TXT_TO_CLIP](#txt_to_clip)
// 	* [REMOVE_TEXT](#remove_text)
// * [Setting variables](#setting-variables)
// 	* [terminalFontZoom](#terminalfontzoom)

// ## Cmd Variables
// --------
// ### TXT_TO_CLIP 
// Copy text to clipboard and launch gpt35 site
// ### REMOVE_TEXT
// Remove request from list

// ### bookmarkListName 
// Input or select bookmark list file name
// - Prefix must be "book" 
// 	ex) "bookSites"

// ## Setting variables
// ---------
// ### terminalFontZoom
// Adjust terminal font size (percentage)
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
onUrlHistoryRegister="OFF"
onAdBlock="OFF"
terminalFontZoom="130"
setReplaceVariables="file://${01}/${001}/settingVariables/setReplaceVariables.js"
setVariableTypes="file://${01}/${001}/settingVariables/setVariableTypes.js"
hideSettingVariables="file://${01}/${001}/settingVariables/hideSettingVariables.js"
scriptFileName="cmdGpt35.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
TXT_TO_CLIP=""
REMOVE_TEXT=""
/// CMD_VARIABLE_SECTION_END



/// Please write bellow with shell script


let args = jsArgs.get().split("\t");
const firstArgs = args.at(0);
const LAUNCH_GPT35="https://huggingface.co/spaces/kunishou/Rapid-GPT";
const REQ_LIST_DIR_PATH = "${REQ_LIST_DIR_PATH}";
const REQ_LIST_FILE_PATH = "${REQ_LIST_FILE_PATH}";
const launchGpt35Arg = "";
const clipArg = "clip";
const removeArg = "remove";
const escapeCharHyphen = "-";


switch(firstArgs){
	case launchGpt35Arg:
		clipText(TXT_TO_CLIP);
		execLaunchGpt35();
		break;
	case clipArg:
		break;
	case removeArg:
		jsListSelect.wrapRemoveItemInListFileCon(
			REQ_LIST_FILE_PATH,
			REMOVE_TEXT,
			"${01}/${02}",
			"TXT_TO_CLIP",
			"REMOVE_TEXT",
		);
		break;
};


function execLaunchGpt35(){
	jsUrl.loadUrl(LAUNCH_GPT35);
};


function clipText(text){
	const clipText = text.trim();
	if(
		clipText
	) {
		jsUtil.copyToClipboard(clipText, 10);
		jsToast.short("copy ok");
	};
	jsListSelect.updateListFileCon(
		REQ_LIST_FILE_PATH,
		clipText
	);
	execLaunchGpt35();
};

