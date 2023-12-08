
jsimport `${selectTyperUpdateSeachWordListJsPath}`;

updateSeachWordList(
	readValueList(),
	"${selectTyperSelectScriptDirPath}",
	"${selectTyperSelectValueListTxtPath}",
);


function readValueList(){
	const cmdValsCon = jsScript.readCmdValsCon("${0}");
	return jsScript.subValOnlyValue(
		"valueList",
		cmdValsCon
	);
}

