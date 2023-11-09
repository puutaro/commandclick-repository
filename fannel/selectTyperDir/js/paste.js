
jsimport "${selectTyperDeactivateInputTextPath}";

sendPasteKeyAction();

function sendPasteKeyAction(){
	deactivateInputText(true);
	jsSendKey.send(
		"tab"
	);
	jsSendKey.send(
		"shift___tab"
	);
	putPasteKey();
};


function putPasteKey(){
	setTimeout(
		function(){
			deactivateInputText(false);
			let activeEl = document.activeElement;
			if(activeEl.tagName != "INPUT") return;
			jsSendKey.send("ctrl___a");
			jsSendKey.send("ctrl_shift___v");
		},
		200
	);
};
