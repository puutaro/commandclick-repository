

/// LABELING_SECTION_START
// file://${01}/${001}/selectTyper.md
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
onAutoExec="ON"
onTermBackendWhenStart="OFF"
onTermVisibleWhenKeyboard="ON"
onTermShortWhenLoad="ON"
onUpdateLastModify="ON"
onUrlHistoryRegister="ON"
execPlayBtnLongPress="WEB_SEARCH"
terminalFontZoom="0"
setReplaceVariables="file://"
setVariableTypes="file://"
hideSettingVariables="file://"
scriptFileName="selectTyper.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
firstButtons=""
secondButtons=""
valueList=""
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript


jsimport "${selectTyperDeactivateInputTextPath}"

let args = jsArgs.get().split("\t");
const FIRST_ARGS = args.at(0);

switchByArg();

function switchByArg(){
	jsFileSystem.createDir(
		"${selectTyperListDirPath}"
	);
	jsFileSystem.createDir(
		"${selectTyperTempDirPath}"
	);
	switch(FIRST_ARGS){
		case "${urlHistoryClickMode}":
			jsIntent.launchShortcut(
				"${currentAppDirPath}",
				"${fannelName}"
			);
			break;
		case "${onAutoExecMode}":
			execOnAutoExecHandler();
			break;
		case "${BACK}":
			sendTabKeyAction(
				"shift___tab",
				"tab",
			);
			break;
		case "${NEXT}":
			sendTabKeyAction(
				"tab",
				"shift___tab",
			);
			break;
		case "${PASTE}":
			sendPasteKeyAction();
			break;
		case "${BACKSPACE}":
			sendDeleteKeyAction();
			break;
		case "${ENTER}":
			jsSendKey.send("${ENTER}");
			break;
		case "${INPUT}":
			termInput();
			break;
		case "${registerValueListMode}":
			updateSeachWordList(
				valueList,
				"${selectTyperSelectScriptDirPath}",
				"${selectTyperSelectValueListTxtPath}",
			);
			break;
	};
};

function putDeleteKey(){
	setTimeout(
		function(){
			deactivateInputText(false);
			let activeEl = document.activeElement;
			if(activeEl.tagName != "INPUT") return;
			const value = activeEl.value;
			if(!value) return;
			jsSendKey.send("ctrl___a");
			jsSendKey.send("${BACKSPACE}");
		},
		200
	);
};

function putPasteKey(){
	setTimeout(
		function(){
			deactivateInputText(false);
			let activeEl = document.activeElement;
			if(activeEl.tagName != "INPUT") return;
			jsSendKey.send("ctrl___a");
			jsSendKey.send("${PASTE}");
		},
		200
	);
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

function execOnAutoExecHandler(){
	execOnAutoLoadUrl();
};

function execOnAutoLoadUrl(){
	jsFileSystem.writeLocalFile(
		"${selectTyperTempFirstTabTxtPath}",
		"",
	);
	const loadUrl = getRecentUrlFromHistory();
	if(!loadUrl) exitZero();
	jsUrl.loadUrl(loadUrl);
};

function getRecentUrlFromHistory(){
	return jsFileSystem.readLocalFile(
		"${appHistoryTsvPath}"
	).split("\n").reverse().slice(-100).map(
		function(line){
			return line.split("\t").at(-1);
		}
	).filter(
		function(url){
			return url.startsWith("http://") 
			|| url.startsWith("https://");
		}
	).at(-1);
};



function updateSeachWordList(
	registerWord,
	listDirPath,
	listFilePath,
){
 	if(
		!registerWord
	) {
		jsToast.short("Must not be blank");
		return;
	};
	jsFileSystem.createDir(
		listDirPath
	);
	jsListSelect.updateListFileCon(
		listFilePath,
		registerWord
	);
	jsToast.short(
		`Register ok:\n ${registerWord}`
	);
};


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
	jsSendKey.send("ctrl___a");
	jsSendKey.send(inputStr);
	updateSeachWordList(
		inputStr,
		"${selectTyperSelectScriptDirPath}",
		"${selectTyperSelectValueListTxtPath}",
	);
};

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
