

jsimport `${FILE_MANAGER_DIR_PATH_JS_PATH}`;
jsimport `${FILE_MANAGER_BROWSE_JS_PATH}`;
jsimport `${FILE_MANAGER_BROWSE_HANDLER_JS_PATH}`;
jsimport `${UPDATE_LIST_BOX_JS__PATH}`;


const dirListCon = jsFileSystem.readLocalFile(
	"${FILE_MANAGER_DIR_LIST_TXT_PATH}"
).split("\n").filter(function(dirPath){
	return dirPath !== "${SET_BLANK_MARK}";
}).reverse().join("\t");
const selectedDirPath = jsDialog.listDialog(
	"",
	"",
	dirListCon
);

if(!selectedDirPath) exitZero();
updateListBox(
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
