

jsimport `${UPDATE_LIST_BOX_JS__PATH}`;
jsimport `${FILE_MANAGER_BROWSE_JS_PATH}`;
jsimport `${FILE_MANAGER_DIR_PATH_JS_PATH}`;
jsimport `${FILE_MANAGER_BROWSE_HANDLER_JS_PATH}`;


jsUbuntu.boot();
jsFileSystem.createDir(
	"${FILE_MANAGER_LIST_DIR_PATH}"
);
jsFileSystem.createDir(
	"${FILE_MANAGER_TEMP_DIR_PATH}"
);

const preRegistDirList = [
	`/storage/emulated/0/Documents/cmdclick/AppDir/default`,
	`/home/cmdclick`,
	"${SET_BLANK_MARK}",
].join("\n");
jsListSelect.initListFile(
	`${FILE_MANAGER_DIR_LIST_TXT_PATH}`,
	preRegistDirList
);

const preRegistRootDirList = [
	`/`,
	"${SET_BLANK_MARK}",
].join("\n");
jsListSelect.initListFile(
	`${FILE_MANAGER_ROOT_DIR_LIST_TXT_PATH}`,
	preRegistRootDirList
);

const preBaseUrlList = [
	"${SET_BLANK_MARK}",
].join("\n");

jsListSelect.initListFile(
	`${FILE_MANAGER_BASE_URL_LIST_TXT_PATH}`,
	preBaseUrlList
);
const cmdValsCon = jsScript.readCmdValsCon("${0}");
const selectDirPath = jsScript.subValOnlyValue(
	"DIR_PATH_LIST",
	cmdValsCon
);
browseHandler(selectDirPath);
