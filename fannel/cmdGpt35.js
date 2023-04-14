

/// LABELING_SECTION_START
// GPT3.5 free client @puutaro
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
setVariableType="LAUNCH_GPT35:RO="
setVariableType="PASTE_TXT:EB=jsf '${0}' paste"
scriptFileName="cmdGpt35.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
LAUNCH_GPT35="https://huggingface.co/spaces/kunishou/Rapid-GPT"
PASTE_TXT=""
/// CMD_VARIABLE_SECTION_END



/// Please write bellow with shell script


let args = jsArgs.get().split("\t");
const firstArgs = args.at(0);
const launchGpt35Arg = "";
const pasteArg = "paste";


switch(firstArgs){
	case launchGpt35Arg:
		execLaunchGpt35();
		break;
	case pasteArg:
		pasteText(PASTE_TXT);
		break;
};


function execLaunchGpt35(){
	jsUrl.loadUrl(LAUNCH_GPT35);
};

function pasteText(text){
	jsUtil.copyToClipboard(text, 10);
};


