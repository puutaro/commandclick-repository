

/// LABELING_SECTION_START
// youtube background play fannel
// 	install -> install require package
// 	play -> youtube play list edit site
//		- recent visit youtube url show in "Save title"
//		- change item  order by drag and drop 
//		- delete item  by doragging to another area(no item area).
// 	tubePlayListName 
//		- Input or select play list file name
//		- prefix must be "tube" ex) "tubePlayList"
// 	tubePlay 
//		- select shuffle or ordinaly and press
//		- press "Exec" and execute play list
// 	numberPlay 
//		- Input or inc/dec number
//		- press "Exec" and play number
//	volume control enable when CommandClick hide
// 	STOP
//		- play stop (recommend: notification bar swip out)
// --
// --
// bellow setting variable main line up
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
// * terminalFontZoom adjust terminal font size (percentage)
// * terminalFontColor adjust terminal font color
// * terminalColor adjust terminal background color
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="OFF"
terminalOutputMode="NORMAL"
onUpdateLastModify="ON"
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
const EXEC_SHELL_PATH = "${01}/cmdYoutuberDir/cmdYoutuber.sh";
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
