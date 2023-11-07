

const selectKey = "CMDCLICL_SELECT_ITEM";
if(!selectKey) exitZero();
selectKeyHandler();


function selectKeyHandler(){
	let activeEl = document.activeElement;
	if(activeEl.tagName != "INPUT") return;
	deactiveteInputText(false);
	jsSendKey.send("ctrl___a");
	jsSendKey.send(selectKey);
	jsSendKey.send("ctrl___a");
};

function deactiveteInputText(
	isDeactivate
){
	var allInputs = document.getElementsByTagName('input'); 
	for (var i = 0, len = allInputs.length; i < len; ++i) {
		allInputs[i].readOnly = isDeactivate;
	};
};
