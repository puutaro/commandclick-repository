

function readCmdVal(
	targetValName
){
	const mainFannelCon = jsFileSystem.readLocalFile(
		"${fannelPath}"
	);
	const cmdCon = jsScript.subCmdVars(
		mainFannelCon
	);
	return jsScript.subValOnlyValue(
		targetValName,
		cmdCon,
	);
};

