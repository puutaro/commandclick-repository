
jsimport "${READ_CMD_VAL_JS_PATH}";
jsimport "${FILE_MANAGER_DIR_PATH_JS_PATH}";
jsimport "${UPDATE_DIR_PATH_LIST_PATH}";

const registerDirPath = makeRegisterDirPath();

updateDirPathList(
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
	const currentDirPathSrc = readCmdVal("DIR_PATH_LIST");
	if(
		!currentDirPathSrc
	) return jsUtil.echoFromClipboard().replace(/\/\/*$/, "");
	return currentDirPathSrc.replace(/\/\/*$/, "");
};
