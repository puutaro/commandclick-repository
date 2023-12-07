

jsimport `${UPDATE_LIST_BOX_JS__PATH}`;

jsScript.readCmdValsCon(`${0}`);
const ROOT_DIR_PATH = jsScript.getCmdVal("ROOT_DIR_PATH");
const BASE_URL = jsScript.getCmdVal("BASE_URL");
const IS_LAUNCH_ON_CLICK_URL_HISTORY = jsScript.getCmdVal("IS_LAUNCH_ON_CLICK_URL_HISTORY");
const setVariableContents = [
	`ROOT_DIR_PATH:LBL:TXT:ELSB=${TXT_LABEL}=Root dir path|${LIST_PATH}=${FILE_MANAGER_ROOT_DIR_LIST_TXT_PATH}!${LIMIT_NUM}=10!${INIT_MARK}=${SET_BLANK_MARK}`,
	`BASE_URL:LBL:TXT:ELSB=${TXT_LABEL}=Base url ( ipv4Add:portNum )|${LIST_PATH}=${FILE_MANAGER_BASE_URL_LIST_TXT_PATH}!${LIMIT_NUM}=10!${INIT_MARK}=${SET_BLANK_MARK}`,
	`IS_LAUNCH_ON_CLICK_URL_HISTORY:LBL:CB=${TXT_LABEL}=Is launch on click url history|OFF!ON`,
].join("\t");
const varNameValCon = [
	`ROOT_DIR_PATH=${ROOT_DIR_PATH}`,
	`BASE_URL=${BASE_URL}`,
	`IS_LAUNCH_ON_CLICK_URL_HISTORY=${IS_LAUNCH_ON_CLICK_URL_HISTORY}`,
].join("\t");
jsValEdit.editAndSaveCmdVar(
    "Setting",
    "${FANNEL_PATH}",
    setVariableContents,
    varNameValCon,
);
jsScript.readCmdValsCon(`${0}`);
checkAndModifyRootDirPathSaved();
checkAndModifyBaseUrlSaved();


function makeRootDirPath(){
	const readRootDirPath = jsScript.getCmdVal("ROOT_DIR_PATH");
	if(readRootDirPath === "/") return readRootDirPath;
	return readRootDirPath.replace(/\/\/*$/, "");
}


function checkAndModifyRootDirPathSaved(){
	const ROOT_DIR_PATH_SAVED = makeRootDirPath();
	const ubuntuPath = jsPath.convertUbuntuPath(ROOT_DIR_PATH_SAVED);
	if(
		ROOT_DIR_PATH_SAVED.startsWith("/")
		&& jsFileSystem.isDir(ubuntuPath)
	) {
		updateListBox(
			ROOT_DIR_PATH_SAVED,
			"${FILE_MANAGER_LIST_DIR_PATH}",
			"${FILE_MANAGER_ROOT_DIR_LIST_TXT_PATH}",
			false,
		);
		return;
	}
	jsEdit.updateByVariable(
		"${FANNEL_PATH}",
	   "ROOT_DIR_PATH",
	    "/",
	);
	if(!ROOT_DIR_PATH_SAVED) return;
	alert(
		`No exist dir path: ${ROOT_DIR_PATH_SAVED}`
	);
}

function checkAndModifyBaseUrlSaved(){
	var BASE_URL_SAVED = jsScript.getCmdVal("BASE_URL");
	if(!BASE_URL_SAVED) return;
	if(
		!BASE_URL_SAVED.startsWith("http://")
		&& !BASE_URL_SAVED.startsWith("https://")
	) {
		BASE_URL_SAVED = `http://${BASE_URL_SAVED}`;
		jsEdit.updateByVariable(
			"${FANNEL_PATH}",
		   "BASE_URL",
		    BASE_URL_SAVED,
		);
	}
	const isPort = /.*:[0-9]{4,}$/.test(BASE_URL_SAVED);
	if(!isPort) {
		alert(
			`BASE_URL must be finish 4 digits or more port num: ${BASE_URL_SAVED}`
		);
		jsEdit.updateByVariable(
			"${FANNEL_PATH}",
		   "BASE_URL",
		    "",
		);
		return;
	}
	updateListBox(
		BASE_URL_SAVED,
		"${FILE_MANAGER_LIST_DIR_PATH}",
		"${FILE_MANAGER_BASE_URL_LIST_TXT_PATH}",
		false,
	);
}
