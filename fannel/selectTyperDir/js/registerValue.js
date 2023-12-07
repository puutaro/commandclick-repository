
jsimport "${selectTyperUpdateSeachWordListJsPath}"

updateSeachWordList(
	readValueList(),
	"${selectTyperSelectScriptDirPath}",
	"${selectTyperSelectValueListTxtPath}",
);


function readValueList(){
	jsScript.readCmdValsCon(`${0}`);
	return jsScript.getCmdVal(
		"valueList",
	);
}

