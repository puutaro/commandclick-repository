

jsimport "${READ_CMD_VAL_JS_PATH}";
jsimport "${UPDATE_DIR_PATH_LIST_PATH}";


const ROOT_DIR_PATH = readCmdVal("ROOT_DIR_PATH");
const IS_LAUNCH_ON_CLICK_URL_HISTORY = readCmdVal("IS_LAUNCH_ON_CLICK_URL_HISTORY");
const setVariableContents = [
	`ROOT_DIR_PATH:LBL:TXT:ELSB=${TXT_LABEL}=Root dir path|${LIST_PATH}=${FILE_MANAGER_ROOT_DIR_LIST_TXT_PATH}!${LIMIT_NUM}=10`,
	`IS_LAUNCH_ON_CLICK_URL_HISTORY:CB=OFF!ON`,
].join("\t");
const varNameValCon = [
	`ROOT_DIR_PATH=${ROOT_DIR_PATH}`,
	`IS_LAUNCH_ON_CLICK_URL_HISTORY=${IS_LAUNCH_ON_CLICK_URL_HISTORY}`,
].join("\t");
jsValEdit.editAndSaveCmdVar(
    "Setting",
    "${FANNEL_PATH}",
    setVariableContents,
    varNameValCon,
);
const ROOT_DIR_PATH_SAVED = makeRootDirPath();
checkAndModifyRootDirPathSaved();
updateDirPathList(
	ROOT_DIR_PATH_SAVED,
	"${FILE_MANAGER_LIST_DIR_PATH}",
	"${FILE_MANAGER_ROOT_DIR_LIST_TXT_PATH}",
	false,
);

function makeRootDirPath(){
	const readRootDirPath = readCmdVal("ROOT_DIR_PATH");
	if(readRootDirPath == "/") return readRootDirPath;
	return readRootDirPath.replace(/\/\/*$/, "");
};


function checkAndModifyRootDirPathSaved(){
	if(
		ROOT_DIR_PATH_SAVED.startsWith("/")
		&& jsFileSystem.isDir(ROOT_DIR_PATH_SAVED)
	) return;
	jsEdit.updateByVariable(
		"${FANNEL_PATH}",
	   "ROOT_DIR_PATH",
	    "/",
	);
	jsToast.short(
		`No exist dir path: ${ROOT_DIR_PATH_SAVED}`
	);
	exitZero();
}