

function sendTabKeyAction(
	mainTabKey,
	reverseTabKey,
){
	deactivateInputText(true);
	const isTempFirstTab = jsFileSystem.isFile(
		"${selectTyperTempFirstTabTxtPath}"
	);
	if(isTempFirstTab){
		jsFileSystem.removeFile(
			"${selectTyperTempFirstTabTxtPath}"
		);
		jsSendKey.send(
			mainTabKey
		);
		jsSendKey.send(
			reverseTabKey
		);
	} else {
		jsSendKey.send(
			mainTabKey
		);
	};
	putSelectMark();
};

function putSelectMark(){
	setTimeout(
		function(){
			deactivateInputText(false);
			let activeEl = document.activeElement;
			if(activeEl.tagName != "INPUT") return;
			const value = activeEl.value;
			if(value) return;
			jsSendKey.send("-");
			jsSendKey.send("ctrl___a");
		},
		200
	);
};

