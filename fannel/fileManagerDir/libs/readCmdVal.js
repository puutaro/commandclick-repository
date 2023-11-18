

function readCmdVal(
	targetValName
){
	const mainFannelCon = jsFileSystem.readLocalFile(
		"${FANNEL_PATH}"
	);
	const cmdCon = jsScript.subCmdVars(
		mainFannelCon
	);
	return jsScript.subValOnlyValue(
		targetValName,
		cmdCon,
	);
};

