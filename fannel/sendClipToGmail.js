

/// LABELING_SECTION_START
// https://github.com/puutaro/sendClipToGmail
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
terminalOutputMode="NORMAL"
onUpdateLastModify="ON"
onUrlHistoryRegister="OFF"
onAdBlock="OFF"
disableSettingValsEdit="ON"
onAutoExec="ON"
terminalFontZoom="0"
terminalColor=""
terminalFontColor=""
setReplaceVariables="file://"
setVariableTypes="file://"
hideSettingVariables="file://"
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
jsFileSystem.createDir(
	"${sendClipToGmailListDirPath}"
);


switch(FIRST_ARGS){
	case "":
		launchOrPaste();
		break;
	case DISPLAY_DRAFT_LIST_MODE:
		execDisplayDraftUrl();
		break;
	case CLIP_TEXT_MODE:
		jsUtil.copyToClipboard(CLIP_TEXT, 10);
		jsToast.short("clip ok");
		break;
	case "onAutoExec":
		jsUrl.loadUrl(gmailDraftUrl);
		break; 
};


function launchOrPaste(){
	execUpdateByVariable(
		"gmailDraftUrl",
		gmailDraftUrl,
		"${sendClipToGmailUrlListFilePath}",
	);
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
	let cmcsubj = document.getElementById("cmcsubj");
	cmcsubj.focus();
	cmcsubj.blur();
	let closeButton = document.querySelector('[tabindex = "0"]');
	closeButton.click();

	setTimeout(
		function(){
			jsSendKey.send("tab");
			jsSendKey.send("tab");
			jsSendKey.send("tab");
			jsSendKey.send("tab");
			jsSendKey.send("tab");
			jsSendKey.send("enter");
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
};

function execDisplayDraftUrl(){
	execUpdateByVariable(
		"gmailDraftListURL",
		gmailDraftListURL,
		"${sendClipToGmailDraftUrlListFilePath}",
	);
	jsUrl.loadUrl(gmailDraftListURL);
};


function execUpdateByVariable(
	variableName,
	variableValue,
	updateListFile,
){
	jsEdit.updateByVariable(
		"${sendClipToGmailDirPath}",
		variableName,
		variableValue,
	);
	jsListSelect.updateListFileCon(
		updateListFile,
		variableValue,
	);
};

