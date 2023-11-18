

jsimport "${READ_CMD_VAL_JS_PATH}";
jsimport "${FILE_MANAGER_DIR_PATH_JS_PATH}";
jsimport "${FILE_MANAGER_BROWSE_JS_PATH}";
jsimport "${FILE_MANAGER_BROWSE_HANDLER_JS_PATH}"
jsimport "${UPDATE_DIR_PATH_LIST_PATH}";


const dirListCon = jsFileSystem.readLocalFile(
	"${FILE_MANAGER_DIR_LIST_TXT_PATH}"
).split("\n").filter(function(dirPath){
	return dirPath != "${DELETE_DIR_PATH_LIST}";
}).reverse().join("\t");
const selectedDirPath = jsDialog.listDialog(
	"",
	"",
	dirListCon
);

if(!selectedDirPath) exitZero();
updateDirPathList(
	selectedDirPath,
	"${FILE_MANAGER_LIST_DIR_PATH}",
	"${FILE_MANAGER_DIR_LIST_TXT_PATH}",
	false,
);
jsEdit.updateByVariable(
	"${FANNEL_PATH}",
   "DIR_PATH_LIST",
    selectedDirPath,
);
browseHandler(selectedDirPath);
