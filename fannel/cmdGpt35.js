

/// LABELING_SECTION_START
// GPT3.5 free client @puutaro
// * TXT_TO_CLIP -> copy text to clipboard and launch gpt35 site
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
setVariableType="TXT_TO_CLIP1:EB=::TermLong::jsf '${0}' TXT_TO_CLIP1"
setVariableType="TXT_TO_CLIP2:EB=::TermLong::jsf '${0}' TXT_TO_CLIP2"
setVariableType="TXT_TO_CLIP3:EB=::TermLong::jsf '${0}' TXT_TO_CLIP3"
setVariableType="TXT_TO_CLIP4:EB=::TermLong::jsf '${0}' TXT_TO_CLIP4"
setVariableType="TXT_TO_CLIP5:EB=::TermLong::jsf '${0}' TXT_TO_CLIP5"
setVariableType="TXT_TO_CLIP6:EB=::TermLong::jsf '${0}' TXT_TO_CLIP6"
setVariableType="TXT_TO_CLIP7:EB=::TermLong::jsf '${0}' TXT_TO_CLIP7"
setVariableType="TXT_TO_CLIP8:EB=::TermLong::jsf '${0}' TXT_TO_CLIP8"
setVariableType="TXT_TO_CLIP9:EB=::TermLong::jsf '${0}' TXT_TO_CLIP9"
setVariableType="TXT_TO_CLIP10:EB=::TermLong::jsf '${0}' TXT_TO_CLIP10"
scriptFileName="cmdGpt35.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
LAUNCH_GPT35="https://huggingface.co/spaces/kunishou/Rapid-GPT"
TXT_TO_CLIP1=""
TXT_TO_CLIP2=""
TXT_TO_CLIP3=""
TXT_TO_CLIP4=""
TXT_TO_CLIP5=""
TXT_TO_CLIP6=""
TXT_TO_CLIP7=""
TXT_TO_CLIP8=""
TXT_TO_CLIP9=""
TXT_TO_CLIP10=""
/// CMD_VARIABLE_SECTION_END



/// Please write bellow with shell script


let args = jsArgs.get().split("\t");
const firstArgs = args.at(0);
const launchGpt35Arg = "";
const pasteArg = "paste";


switch(true){
	case firstArgs == "":
		execLaunchGpt35();
		break;
	case firstArgs.includes("TXT_TO_CLIP"):
		pasteText(eval(firstArgs));
		break;
};


function execLaunchGpt35(){
	jsUrl.loadUrl(LAUNCH_GPT35);
};

function pasteText(text){
	jsUtil.copyToClipboard(text, 10);
	jsToast.short("copy ok");
	execLaunchGpt35();
};
