
jsimport `${selectTyperDeactivateInputTextPath}`;

const selectKey = "${SELECT_ITEM}";
if(!selectKey) exitZero();

selectKeyHandler();


function selectKeyHandler(){
	let activeEl = document.activeElement;
	if(activeEl.tagName !== "INPUT") return;
	deactivateInputText(false);
	jsSendKey.send("ctrl___a");
	jsSendKey.send(selectKey);
	jsSendKey.send("ctrl___a");
};
