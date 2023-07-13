

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
// * terminalFontZoom
// 	-> adjust terminal font size (percentage)
// * terminalFontColor
// 	-> adjust terminal font color
// * terminalColor
// 	-> adjust terminal background color
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
terminalOutputMode="NORMAL"
onUpdateLastModify="ON"
onUrlHistoryRegister="OFF"
onAdBlock="OFF"
terminalFontZoom="0"
terminalColor=""
terminalFontColor=""
setReplaceVariables="file://${01}/${001}/settingVariables/setReplaceVariables.js"
setVariableTypes="file://${01}/${001}/settingVariables/setVariableTypes.js"
hideSettingVariables="file://${01}/${001}/settingVariables/hideSettingVariables.js"
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
	let draftBox = document.getElementById("cmcbodyc");
	let draftBody = draftBox.children[0];
	let gmailContents = draftBody.textContent;
	if(!gmailContents){
		const clipString = jsUtil.echoFromClipboard();
		const subjString = echoTitleOrRawString(
			clipString
		);
		document.getElementById("cmcsubj").value = subjString;
		let clipStringList = clipString.split("\n");
		const firstLine = clipStringList.at(0);
		let clipStringListFromSecond = clipStringList.slice(1);
		draftBody.textContent = firstLine;
		let insertClipString = [...clipStringListFromSecond].map(
			function(line){
				const insertLine = line
					.replaceAll("\&", "\&amp;")
					.replaceAll("\<", "\&lt;")
					.replaceAll("\>", "\&gt;")
					.replaceAll("\"", "\&quot;")
					.replaceAll("\"", "\&quot;")
					.replaceAll("\ ", "\&nbsp;");
				return `<div>${insertLine}</div>`
			}
		).join("");
		draftBody.innerHTML += insertClipString;
		return
	};
	let glList = document.getElementsByClassName("Jl");
	let closeButton = glList[0];
	closeButton.click();

	setTimeout(
		function(){
			let closeButtonList = document.getElementsByClassName("fr");
			let saveButtonParent = closeButtonList[1];
			let saveButton = saveButtonParent.children[0];
			saveButton.click();
		},
		600
	);
	jsToast.short("send ok");
};

function echoTitleOrRawString(
	clipString
){
	const httpString = "http";
	if(
		!clipString.trim().startsWith(
			httpString
		)
	) {
		return clipString
			.replaceAll("\n", "")
			.substring(0, 50);
	};
	return jsCurl.get(
		clipString,
		"",
		"",
		1000,
	).match(/<title[^>]*>([^<]+)<\/title>/)[1];
};

function makeRandomValName() {
	const S="abcdefghijklmnopqrstuvwxyz";
	const N=4;
	return Array.from(
		crypto.getRandomValues(
			new Uint8Array(N))
		).map(
		(n) => S[n%S.length]
	).join('')
}