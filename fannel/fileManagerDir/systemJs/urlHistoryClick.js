

jsimport "${READ_CMD_VAL_JS_PATH}";
jsimport "${FILE_MANAGER_BROWSE_JS_PATH}";
jsimport "${FILE_MANAGER_DIR_PATH_JS_PATH}";
jsimport "${FILE_MANAGER_BROWSE_HANDLER_JS_PATH}";


urlHistoryClickHandler();

function urlHistoryClickHandler(){
	const selectDirPath = readCmdVal("DIR_PATH_LIST");
	const IS_LAUNCH_ON_CLICK_URL_HISTORY = readCmdVal("IS_LAUNCH_ON_CLICK_URL_HISTORY");
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
