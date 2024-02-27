

jsimport `${selectTyperDeactivateInputTextPath}`;


sendDeleteKeyAction();

function sendDeleteKeyAction(){
	deactivateInputText(true);
	jsSendKey.send(
		"tab"
	);
	jsSendKey.send(
		"shift___tab"
	);
	putDeleteKey();
};


function putDeleteKey(){
	setTimeout(
		function(){
			deactivateInputText(false);
			let activeEl = document.activeElement;
			if(activeEl.tagName !== "INPUT") return;
			const value = activeEl.value;
			if(!value) return;
			jsSendKey.send("ctrl___a");
			jsSendKey.send("backspace");
		},
		200
	);
};
