

const selectCmd = "CMDCLICL_SELECT_ITEM";
if(!selectCmd) exitZero();
deactiveteInputText(false);
const deleteSelect = "DELETE";
switch(true){
	case selectCmd == deleteSelect:
		jsSendKey.send("ctrl___a");
		jsSendKey.send("backspace");
		exitZero();
	case selectCmd != deleteSelect:
		jsSendKey.send(selectCmd);
		exitZero();
};

function deactiveteInputText(
	isDeactivate
){
	var allInputs = document.getElementsByTagName('input'); 
	for (var i = 0, len = allInputs.length; i < len; ++i) {
		allInputs[i].readOnly = isDeactivate;
	};
};
