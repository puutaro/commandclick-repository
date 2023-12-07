

jsimport `${FILE_MANAGER_DIR_PATH_JS_PATH}`;
jsimport `${FILE_MANAGER_BROWSE_JS_PATH}`;
jsimport `${FILE_MANAGER_BROWSE_HANDLER_JS_PATH}`;

const selectDirPath = "CMDCLICL_SELECT_ITEM";
if(!selectDirPath) exitZero();

browseHandler(
	selectDirPath,
);
