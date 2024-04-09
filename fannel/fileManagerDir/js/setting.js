

jsimport `${UPDATE_LIST_BOX_JS__PATH}`;

launchSettingDialog();
afterCheckProcess();

function launchSettingDialog() {
	const setVariableContents = [
		`ROOT_DIR_PATH:LBL:TXT:ELSB=${TXT_LABEL}=Root dir path|${LIST_PATH}=${FILE_MANAGER_ROOT_DIR_LIST_TXT_PATH}?${LIMIT_NUM}=10?${INIT_MARK}=${SET_BLANK_MARK}`,
		`BASE_URL:LBL:TXT:ELSB=${TXT_LABEL}=Base url ( ipv4Add:portNum )|${LIST_PATH}=${FILE_MANAGER_BASE_URL_LIST_TXT_PATH}?${LIMIT_NUM}=10?${INIT_MARK}=${SET_BLANK_MARK}`,
		`IS_LAUNCH_ON_CLICK_URL_HISTORY:LBL:CB=${TXT_LABEL}=Is launch on click url history|OFF?ON`,
	].join("\n");
	const varNameValCon = [
		`ROOT_DIR_PATH=${ROOT_DIR_PATH}`,
		`BASE_URL=${BASE_URL}`,
		`IS_LAUNCH_ON_CLICK_URL_HISTORY=${IS_LAUNCH_ON_CLICK_URL_HISTORY}`,
	].join("\n");
	jsValEdit.editAndSaveCmdVar(
		"Setting",
		"${FANNEL_PATH}",
		setVariableContents,
		varNameValCon,
	);
}

function afterCheckProcess() {
	const cmdValsCon = jsScript.readCmdValsCon(`${0}`);
	checkAndModifyRootDirPathSaved(cmdValsCon);
	checkAndModifyBaseUrlSaved(cmdValsCon);
}


function checkAndModifyRootDirPathSaved(cmdValsCon){
	const ROOT_DIR_PATH_SAVED = makeRootDirPathForSetting(cmdValsCon);
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

function makeRootDirPathForSetting(cmdValsCon){
	const readRootDirPath = jsScript.subValOnlyValue(
		"ROOT_DIR_PATH",
		cmdValsCon,
	);
	if(readRootDirPath === "/") return readRootDirPath;
	return readRootDirPath.replace(/\/\/*$/, "");
}

function checkAndModifyBaseUrlSaved(cmdValsCon){
	var BASE_URL_SAVED = jsScript.subValOnlyValue(
		"BASE_URL",
		cmdValsCon,
	);
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
