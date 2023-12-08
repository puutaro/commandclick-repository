
jsimport `${FILE_MANAGER_DIR_PATH_JS_PATH}`;
jsimport `${UPDATE_LIST_BOX_JS__PATH}`;

const registerDirPath = makeRegisterDirPath();

updateListBox(
	registerDirPath,
	"${FILE_MANAGER_LIST_DIR_PATH}",
	"${FILE_MANAGER_DIR_LIST_TXT_PATH}",
);

jsEdit.updateByVariable(
	"${FANNEL_PATH}",
   "DIR_PATH_LIST",
    registerDirPath,
);

function makeRegisterDirPath(){
	const currentDirPath = getCurrentDirPath();
	const urlPrefix = makeFMUrlPrefix();
	const urlFilePrefix = `${urlPrefix}/files`;
	if(
		currentDirPath.startsWith(`/`)
	) return currentDirPath;
	if(
		!currentDirPath.startsWith(`${urlFilePrefix}/`)
	) {
		jsToast.short(`Invalid dir path: ${currentDirPath}`);
		exitZero();
	}
	const urlFilePrefixRegex = new RegExp(`^${urlFilePrefix}`);
	return currentDirPath.replace(urlFilePrefixRegex, "");
};

function getCurrentDirPath(){
	const cmdValsCon = jsScript.readCmdValsCon("${0}");
	const currentDirPathSrc = jsScript.subValOnlyValue(
		"DIR_PATH_LIST",
		cmdValsCon,
	);
	if(
		!currentDirPathSrc
	) return jsUtil.echoFromClipboard().replace(/\/\/*$/, "");
	return currentDirPathSrc.replace(/\/\/*$/, "");
};
