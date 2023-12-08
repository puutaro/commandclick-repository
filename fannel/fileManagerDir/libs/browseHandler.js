

function browseHandler(
	selectDirPath,
	DISABLE_LAUNCH_URL = "",
){
	const cmdValsCon = jsScript.readCmdValsCon("${0}");
	const ROOT_DIR_PATH = makeRootDirPath(cmdValsCon);
	const PREVIOUST_ROOT_DIR_PATH = jsFileSystem.readLocalFile(
		"${PRVIOUS_ROOT_DIR_MEMO_TXT_PATH}"
	).replace(/\n$/, "");
	const BASE_URL = jsScript.subValOnlyValue(
		"BASE_URL",
		cmdValsCon,
	);
	const isBaseUrl = 
		BASE_URL != null && BASE_URL !== "";
	const isEqualRootDirPath = 
		ROOT_DIR_PATH === PREVIOUST_ROOT_DIR_PATH
		&& jsUbuntu.isProc("filebrowser --address");
	const isFastBrowse = 
		isEqualRootDirPath || isBaseUrl;
	switch(isFastBrowse){
		case true:
			fastBrowse(
				ROOT_DIR_PATH,
				selectDirPath,
				BASE_URL,
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
	selectDirPath,
	BASE_URL,
){
	const launchFileUrl = makeFileUrl(
		ROOT_DIR_PATH,
		selectDirPath,
		BASE_URL,
	);
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

function makeFileUrl(
	ROOT_DIR_PATH,
	selectDirPath,
	BASE_URL,
){
	const IPV4_ADDRESS = jsNetTool.getIpv4();
	const urlDirPath = makeDirPath(
		ROOT_DIR_PATH,
		selectDirPath,
	);
	if(
		!BASE_URL
	) return `http://${IPV4_ADDRESS}:${PORT_NUM}/files${urlDirPath}`;
	jsToast.short("Remote connect..");
	return `${BASE_URL}/files${urlDirPath}`;
};
