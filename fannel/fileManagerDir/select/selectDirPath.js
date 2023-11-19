

jsimport "${READ_CMD_VAL_JS_PATH}";
jsimport "${FILE_MANAGER_DIR_PATH_JS_PATH}";
jsimport "${FILE_MANAGER_BROWSE_JS_PATH}";
jsimport "${FILE_MANAGER_BROWSE_HANDLER_JS_PATH}";

const selectDirPath = "CMDCLICL_SELECT_ITEM";
if(!selectDirPath) exitZero();

selectSwitcher(selectDirPath);

function selectSwitcher(
	selectDirPath
){
	const isDelete = selectDirPath == "${SET_BLANK_MARK}";
	switch(isDelete){
		case true:
			jsEdit.updateByVariable(
				"${FANNEL_PATH}",
				"DIR_PATH_LIST",
			    "",
			);
			break;
		case false:
			browseHandler(
				selectDirPath,
			);
			break;
	};
};