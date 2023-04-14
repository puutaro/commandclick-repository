

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
setVariableType="PASTE_TXT1:EB=jsf '${0}' PASTE_TXT1"
setVariableType="PASTE_TXT2:EB=jsf '${0}' PASTE_TXT2"
setVariableType="PASTE_TXT3:EB=jsf '${0}' PASTE_TXT3"
setVariableType="PASTE_TXT4:EB=jsf '${0}' PASTE_TXT4"
setVariableType="PASTE_TXT5:EB=jsf '${0}' PASTE_TXT5"
setVariableType="PASTE_TXT6:EB=jsf '${0}' PASTE_TXT6"
setVariableType="PASTE_TXT7:EB=jsf '${0}' PASTE_TXT7"
setVariableType="PASTE_TXT8:EB=jsf '${0}' PASTE_TXT8"
setVariableType="PASTE_TXT9:EB=jsf '${0}' PASTE_TXT9"
setVariableType="PASTE_TXT10:EB=jsf '${0}' PASTE_TXT10"
scriptFileName="cmdGpt35.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
LAUNCH_GPT35="https://huggingface.co/spaces/kunishou/Rapid-GPT"
PASTE_TXT1=""
PASTE_TXT2=""
PASTE_TXT3=""
PASTE_TXT4=""
PASTE_TXT5=""
PASTE_TXT6=""
PASTE_TXT7=""
PASTE_TXT8=""
PASTE_TXT9=""
PASTE_TXT10=""
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
	case firstArgs.includes("PASTE_TXT"):
		pasteText(eval(firstArgs));
		break;
};


function execLaunchGpt35(){
	jsUrl.loadUrl(LAUNCH_GPT35);
};

function pasteText(text){
	jsUtil.copyToClipboard(text, 10);
	jsToast.short("copy ok");
};
