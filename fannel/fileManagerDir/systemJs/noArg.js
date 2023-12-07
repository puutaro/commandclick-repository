

jsimport `${FILE_MANAGER_BROWSE_JS_PATH}`;
jsimport `${FILE_MANAGER_DIR_PATH_JS_PATH}`;
jsimport `${FILE_MANAGER_BROWSE_HANDLER_JS_PATH}`;


jsScript.readCmdValsCon(`${0}`);
const selectDirPath = jsScript.getCmdVal("DIR_PATH_LIST");
browseHandler(selectDirPath);
