

jsimport "${selectTyperDeactivateInputTextPath}";
jsimport "${selectTyperUpdateSeachWordListJsPath}";

termInput();

function termInput(){
	const suggestMapStr = [
		 "variableName=selectTyperInput",
		 "concatFilePathList=${selectTyperSelectValueListTxtPath}",
	].join("|");
	const inputStr = jsDialog.prompt(
		"",
		"",
		suggestMapStr,
	);
	if(!inputStr) exitZero();
	deactivateInputText(false);
	updateSeachWordList(
		inputStr,
		"${selectTyperSelectScriptDirPath}",
		"${selectTyperSelectValueListTxtPath}",
	);
	let activeEl = document.activeElement;
	if(activeEl.tagName != "INPUT") return;
	jsSendKey.send("ctrl___a");
	jsSendKey.send(inputStr);
};