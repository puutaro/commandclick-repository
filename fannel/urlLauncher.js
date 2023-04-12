

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
scriptFileName="urlLauncher.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
LAUNCH_URL=""
/// CMD_VARIABLE_SECTION_END



/// Please write bellow with shell script


let args = jsArgs.get().split("\t");
const firstArgs = args.at(0);
const launchUrlArg = "";


switch(firstArgs){
	case launchUrlArg:
		execUrlLaunch();
		break;
};


function execUrlLaunch(){
	jsUrl.loadUrl(LAUNCH_URL);
};


