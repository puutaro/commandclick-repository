

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


let args = jsArgs.get().split("\t");
const FIRST_ARGS = args.at(0);

switchByArg();

function switchByArg(){
	jsFileSystem.createDir(
		"${selectTyperListDirPath}"
	);
	insertDeleteListFileCon();
	switch(FIRST_ARGS){
		case "${onAutoExecMode}":
			execOnAutoExecHandler();
			break;
		case "${BACK}":
			deactiveteInputText(true);
			jsSendKey.send("shift___tab");
			break;
		case "${NEXT}":
			deactiveteInputText(true);
			jsSendKey.send("tab");
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

function execOnAutoExecHandler(){
	execOnAutoLoadUrl();
};

function execOnAutoLoadUrl(){
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

function insertDeleteListFileCon(){
	jsFileSystem.createDir(
		"${selectTyperSelectScriptDirPath}",
	);
	const deleteSelect = "DELETE";
	const isIncludeDelete = jsFileSystem.readLocalFile(
		"${selectTyperSelectValueListTxtPath}",
	).split("\n").filter(
		function(line){
			return line == deleteSelect;
		}).at(0);
	if(isIncludeDelete) return;
	jsListSelect.updateListFileCon(
	    "${selectTyperSelectValueListTxtPath}",
	    deleteSelect
	);
};

function deactiveteInputText(
	isDeactivate
){
	var allInputs = document.getElementsByTagName('input'); 
	for (var i = 0, len = allInputs.length; i < len; ++i) {
		allInputs[i].readOnly = isDeactivate;
	};
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
	jsSendKey.send(inputStr);
	updateSeachWordList(
		inputStr,
		"${selectTyperSelectScriptDirPath}",
		"${selectTyperSelectValueListTxtPath}",
	);
};
