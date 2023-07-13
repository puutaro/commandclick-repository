

/// LABELING_SECTION_START
// textToSpeech player @puutaro
//	* play 
// 		-> tts play list site
//	* manageText 
// 		-> Target music file saved directory path
// 	* playListName 
//		-> Input or select play list file name
//		- Prefix must be "music" ex) "ttsPlayList"
// 	* ttsPlay 
//		-> Select shuffle or ordinaly and press
//		- Press "Exec" and execute play list
// 	* numberPlay 
//		-> Input or inc/dec number
//		- Press "Exec" and play number
// 	* gmailToFile 
//		-> write gmail contetns to file
//		- when no gmail launch, gmail launch
//		- when look gmail body, write this contents to file 
// 	* manageText 
//		-> remove text file or add one to editHtmlSite 
//		- select text file and click "MNG" button
//  * onTrack
//		ON: memory past number and step
//		OFF: no memory past number and step
//	* Volume control enable when CommandClick hide
// --
// --
// Bellow setting variable main line up
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
terminalSizeType="LONG"
terminalOutputMode="NORMAL"
onUpdateLastModify="ON"
ignoreHistoryPaths="${01}"
onUrlHistoryRegister="ON"
execPlayBtnLongPress="WEB_SEARCH"
execEditBtnLongPress=""
terminalFontZoom="0"
terminalColor=""
terminalFontColor=""
scriptFileName="rtsPlayer.js"
setReplaceVariables="BTN_CMD=cmd"
setReplaceVariables="BTN_LABEL=label"
setVariableTypes="PLAY:BTN=${BTN_CMD}=::TermOut::jsf '${0}' PLAY!${BTN_LABEL}=PLAY"
setVariableTypes="STOP:BTN=${BTN_CMD}=jsf '${0}' STOP!${BTN_LABEL}=STOP"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
// playListName="ttsPlayList.tsv"
// playMode="ordinaly"
PLAY=""
STOP=""
// EDIT_PLAY_LIST=""
// gmailToFile=""
// manageText=""
// Speed="50"
// Pitch="50"
// onEnglish="OFF"
// onTrack="ON"
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript



let args = jsArgs.get().split("\t");
var FIRST_ARGS = args.at(0);
const PLAY_MODE= "PLAY";
const STOP_MODE= "STOP";

switch(FIRST_ARGS){
	case PLAY_MODE:
		jsToast.short("play");
		jsRecordToText.start();
		break;
	case STOP_MODE:
		jsRecordToText.stop();
		break;
};