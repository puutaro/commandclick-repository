

/// LABELING_SECTION_START
// Send clipboard contents to Gmail draft @puutaro
// 	* gmailDraftUrl 
// 		-> paste gmail draft url
//  * gmailDraftListURL 
// 		-> paste gmail draft list url
// 	* play -> 
//		if gmailDraftUrl doesn't launch, launch it.
//		if gmailDraftUrl launch and gmail content blank, paste it's content 
//		if gmailDraftUrl launch and gmail content has been written, save contents. 
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
// * terminalFontZoom adjust terminal font size (percentage)
// * terminalFontColor adjust terminal font color
// * terminalColor adjust terminal background color
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
terminalOutputMode="NORMAL"
onUpdateLastModify="ON"
onUrlHistoryRegister="OFF"
terminalFontZoom="0"
terminalColor=""
terminalFontColor=""
setVariableType="DISPLAY_DRAFT_LIST:BTN=::TermLong::jsf '${0}' DRAFT_LIST"
setVariableType="CLIP_TEXT:EB=::TermLong::jsf '${0}' CLIP_TEXT"
scriptFileName="sendClipToGmail.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
gmailDraftUrl=""
gmailDraftListURL=""
CLIP_TEXT=""
DISPLAY_DRAFT_LIST=""
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript


let args = jsArgs.get().split("\t");
const DEFAULT_TERM_OUTPUT = "NORMAL";
const FIRST_ARGS = args.at(0);
const LAUNCH_DRAFT_MODE = "LAUNCH_DRAFT";
const DISPLAY_DRAFT_LIST_MODE = "DRAFT_LIST";
const CLIP_TEXT_MODE = "CLIP_TEXT";



switch(FIRST_ARGS){
	case "":
		launchOrPaste();
		break;
	case DISPLAY_DRAFT_LIST_MODE:
		jsUrl.loadUrl(gmailDraftListURL);
		break;
	case CLIP_TEXT_MODE:
		jsUtil.copyToClipboard(CLIP_TEXT, 10);
		jsToast.short("clip ok");
		break;
};


function launchOrPaste(){
	if(
		window.location.href 
			!= gmailDraftUrl
	) {
		jsUrl.loadUrl(gmailDraftUrl);
		return
	};
	pasteOrSave();
};


function pasteOrSave(){
	let gmailContents = document.getElementsByClassName("Nl")[0].textContent;
	if(!gmailContents){
		const clipString = jsUtil.echoFromClipboard();
		const subjString = clipString
				.replaceAll("\n", "")
				.substring(0, 20);
		document.getElementById("cmcsubj").value = subjString;
		let draftBody = document.getElementsByClassName("Nl")[0];
		let clipStringList = clipString.split("\n");
		const firstLine = clipStringList.at(0);
		let clipStringListFromSecond = clipStringList.slice(1);
		draftBody.textContent = firstLine;
		let insertClipString = [...clipStringListFromSecond].map(
			function(line){
				return `<div>${line}</div>`
			}
		).join("");
		draftBody.innerHTML += insertClipString;
		return
	};
	let glList = document.getElementsByClassName("Gl");
	let closeButton = glList[0];
	closeButton.click();
	setTimeout(
		function(){
			let nqList = document.getElementsByClassName("Nq");
			let saveButtonParent = nqList[1];
			let saveButton = saveButtonParent.children[0];
			saveButton.children[0].click();
		}, 
		600
	);
	jsToast.short("send ok");
	setTimeout(
		function(){
				jsFileSystem.fileEcho(
				scriptFileName,
				terminalOutputMode,
			);
		}, 
		1000
	);
};
