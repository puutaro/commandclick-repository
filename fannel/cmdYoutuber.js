

/// LABELING_SECTION_START
// * terminalSizeType is cmdclick terminal size option
//  - OFF: no adjust (default)
//  - LONG: LongSize
//  - SHORT: ShortSize
// * terminalOutputMode decide output mode in cmdclick terminal
//  - NORMAL: normal terminal output (default)
//  - REFLASH: Before terminal output, screen resflesh
//  - REFLASH_AND_FIRST_ROW: Before terminal output, screen resflesh and focus first row
//  - DEBUG: stdr + stderr
//  - NO: no output (bacground exec)
// * onUpdateLastModify is how updating file last modified status when executing
//  - ON: update this (default)
//  - OFF: no update this
// * onAdBlock: adblock switch
//  - INHERIT: inherit config setting
//  - ON: on
//  - OFF: off
// * execJsOrHtmlPath: execute javascript or html file path
//   - disable, when onUrlLaunchMacro is not OFF
// * terminalFontZoom adjust terminal font size (percentage)
// * terminalFontColor adjust terminal font color
// * terminalColor adjust terminal background color
// * setVariableType is cmdsection gui edit mini program, reference to github for detail (like gtk yad)
//  - ex) spinner: {cmdVariable}:CB=ON!OFF  
//  - ex) num crementer: {cmdVariable}:NUM=1!1..100!1 (({init})!{min}..{max}!{step})
//  - ex) file selector: {cmdVariable}:FL=
//  - ex) button: {cmdVariable}:BTN=
//    - button execute command 
//      ex) echo $0  
//             ("$0" is current shell path
//      ex) ::BackStack:: ls
//             ("::BackStack::" is backstack, only work when prefix
//      ex) ::BackStack:: ls
//             ("::BackStack::" enable terminal output
//      ex) top -n 1 > /dev/null  
//             (when suffix is "> /dev/null" or "> /dev/null 2>&1", no output
//  - ex) dir selector: {cmdVariable}:DIR=
//  - ex) read only: {cmdVariable}:RO=
//  - ex) password: {cmdVariable}:H=
//  - enable multiple specification
//  - ex) 
//  setVariableType="{cmdVar1}:CB=ON!OFF"
//  setVariableType="{cmdVar2}:FL="
//  setVariableType="..."
// * scriptFileName is your shell file name
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="OFF"
terminalOutputMode="NORMAL"
onUpdateLastModify="ON"
onAdBlock="INHERIT"
execJsOrHtmlPath=""
terminalFontZoom="0"
terminalColor=""
terminalFontColor=""
setVariableType="tubePlayListName:EFCB=tube"
setVariableType="tubePlay:CBB=shuffle!ordinaly|::TermOut::jsf '${0}'"
setVariableType="numberPlay:NUMB=!1..1000!1|::TermOut::jsf '${0}' number"
setVariableType="STOP:BTN=pkill -9 mpv"
setVariableType="Install:BTN=jsf '${0}'"
setVariableType=""
scriptFileName="cmdYoutuber.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
tubePlayListName="/storage/emulated/0/Documents/cmdclick/AppDir/default/tubePlayList"
tubePlay="shuffle"
numberPlay="4"
STOP=""
Install="install"
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript



function exit(){
	throw new Error('exit');
};

let args = jsArgs.get().split("\t");
const DEFAULT_TERM_OUTPUT = "NORMAL";
const FIRST_ARGS = args.at(0);
const EXEC_SHELL_PATH = "${01}/cmdYoutuberLib/cmdYoutuber.sh";
const EDIT_FILE_PATH = "${01}/" + tubePlayListName;
const APP_URL_HISTORY_PATH="${01}/system/url/cmdclickUrlHistory";
const INSTALL_MODE = "install";
const SHUFFLE_MODE = "shuffle";
const ORDINALY_MODE = "ordinaly";
const NUMBER_MODE = "number";


if(FIRST_ARGS){
	jsFileSystem.fileEcho(
		scriptFileName,
		terminalOutputMode,
	);
}


switch(FIRST_ARGS){
	case "":
		jsIntent.launchEditSite(
			EDIT_FILE_PATH,
			APP_URL_HISTORY_PATH,
			"false",
			"urlString.startsWith('http') && urlString.includes(\"youtube\");"
		);
		exit();
		break;
	case INSTALL_MODE:
		cmdIntent.run(
			"bash \"" + EXEC_SHELL_PATH + 
			"\" "  + INSTALL_MODE
		);
		exit();
		break;
	case SHUFFLE_MODE:
		cmdIntent.run(
			"bash \"" + EXEC_SHELL_PATH + 
			"\" " + SHUFFLE_MODE +
			" " + EDIT_FILE_PATH
		);
		exit();
		break;
	case ORDINALY_MODE:
		cmdIntent.run(
			"bash \"" + EXEC_SHELL_PATH + 
			"\" " + ORDINALY_MODE + 
			" " + EDIT_FILE_PATH
		);
		exit();
		break;
	case NUMBER_MODE:
		cmdIntent.run(
			"bash \"" + EXEC_SHELL_PATH + 
			"\" " + NUMBER_MODE + 
			" " + EDIT_FILE_PATH +
			" " + numberPlay
		);
		exit();
		break;
};
