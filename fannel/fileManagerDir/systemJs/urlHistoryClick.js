

jsimport `${FILE_MANAGER_BROWSE_JS_PATH}`;
jsimport `${FILE_MANAGER_DIR_PATH_JS_PATH}`;
jsimport `${FILE_MANAGER_BROWSE_HANDLER_JS_PATH}`;


urlHistoryClickHandler();

function urlHistoryClickHandler(){
	switch(`${IS_LAUNCH_ON_CLICK_URL_HISTORY}`){
		case "OFF":
			launchFileBrowser(
				`${DIR_PATH_LIST}`,
			);
			break;
		case "ON":
			browseHandler(`${DIR_PATH_LIST}`);
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
