

jsimport "${READ_CMD_VAL_JS_PATH}";
jsimport "${FILE_MANAGER_BROWSE_JS_PATH}";
jsimport "${FILE_MANAGER_DIR_PATH_JS_PATH}";
jsimport "${FILE_MANAGER_BROWSE_HANDLER_JS_PATH}";


const selectDirPath = readCmdVal("DIR_PATH_LIST");
browseHandler(selectDirPath);
