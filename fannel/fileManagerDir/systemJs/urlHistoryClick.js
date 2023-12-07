

jsimport `${FILE_MANAGER_BROWSE_JS_PATH}`;
jsimport `${FILE_MANAGER_DIR_PATH_JS_PATH}`;
jsimport `${FILE_MANAGER_BROWSE_HANDLER_JS_PATH}`;


urlHistoryClickHandler();

function urlHistoryClickHandler(){
	jsScript.readCmdValsCon(`${0}`);
	const selectDirPath = jsScript.getCmdVal("DIR_PATH_LIST");
	const IS_LAUNCH_ON_CLICK_URL_HISTORY = jsScript.getCmdVal("IS_LAUNCH_ON_CLICK_URL_HISTORY");
	switch(IS_LAUNCH_ON_CLICK_URL_HISTORY){
		case "OFF":
			launchFileBrowser(
				selectDirPath
			);
			break;
		case "ON":
			browseHandler(selectDirPath);
			break;
	};
};

function launchFileBrowser(
	selectDirPath
){
	if(
		jsUbuntu.isProc("filebrowser --address")
	) {
		jsToast.short("Already launch");
		return;
	};
	formalBrowse(
		selectDirPath,
		"disableLaunchUrlHistory",
	);
};
