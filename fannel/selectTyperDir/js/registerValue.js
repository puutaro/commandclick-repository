
jsimport "${selectTyperUpdateSeachWordListJsPath}"

updateSeachWordList(
	readValueList(),
	"${selectTyperSelectScriptDirPath}",
	"${selectTyperSelectValueListTxtPath}",
);


function readValueList(){
	const mainFannelCon = jsFileSystem.readLocalFile(
		"${fannelPath}"
	);
	const cmdCon = jsScript.subCmdVars(
		mainFannelCon
	);
	return jsScript.subValOnlyValue(
		"valueList",
		cmdCon,
	);
};

