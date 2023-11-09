

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
