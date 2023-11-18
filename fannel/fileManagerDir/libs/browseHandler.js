

function browseHandler(
	selectDirPath,
	DISABLE_LAUNCH_URL = "",
){
	const ROOT_DIR_PATH = makeRootDirPath();
	const PREVIOUST_ROOT_DIR_PATH = jsFileSystem.readLocalFile(
		"${PRVIOUS_ROOT_DIR_MEMO_TXT_PATH}"
	).replace(/\n$/, "");
	const isRootEqual = 
		ROOT_DIR_PATH == PREVIOUST_ROOT_DIR_PATH
		&& jsUbuntu.isProc("filebrowser --address");
	switch(isRootEqual){
		case true:
			fastBrowse(
				ROOT_DIR_PATH,
				selectDirPath
			);
			break;
		case false:
			formalBrowse(
				selectDirPath,
				DISABLE_LAUNCH_URL,
			);
			break;
	};
};

function fastBrowse(
	ROOT_DIR_PATH,
	selectDirPath
){
	const IPV4_ADDRESS = jsNetTool.getIpv4();
	const urlDirPath = makeDirPath(
		ROOT_DIR_PATH,
		selectDirPath,
	);
	const launchFileUrl = `http://${IPV4_ADDRESS}:${PORT_NUM}/files${urlDirPath}`;
	jsUrl.loadUrl(launchFileUrl);
};

function formalBrowse(
	selectDirPath,
	DISABLE_LAUNCH_URL = "",
){
	jsEdit.updateByVariable(
		"${FANNEL_PATH}",
	  	"DIR_PATH_LIST",
	    selectDirPath,
	);
	execBrowse(DISABLE_LAUNCH_URL);
};
