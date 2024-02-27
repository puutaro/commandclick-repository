
jsimport "${selectTyperGetRecentUrlFromHisConJsPath}";
execOnAutoExecHandler();


function execOnAutoExecHandler(){
	jsFileSystem.createDir(
		"${selectTyperListDirPath}"
	);
	jsFileSystem.createDir(
		"${selectTyperTempDirPath}"
	);
	execOnAutoLoadUrl();
};

function execOnAutoLoadUrl(){
	jsFileSystem.writeLocalFile(
		"${selectTyperTempFirstTabTxtPath}",
		"",
	);
	const historyCon = jsFileSystem.readLocalFile(
		"${appHistoryTsvPath}"
	);
	const loadUrl = getRecentUrlFromHisCon(historyCon);
	if(!loadUrl) exitZero();
	jsUrl.loadUrl(loadUrl);
};
