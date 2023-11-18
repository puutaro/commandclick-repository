

jsimport "${UPDATE_DIR_PATH_LIST_PATH}";
jsimport "${READ_CMD_VAL_JS_PATH}";
jsimport "${FILE_MANAGER_BROWSE_JS_PATH}";
jsimport "${FILE_MANAGER_DIR_PATH_JS_PATH}";
jsimport "${FILE_MANAGER_BROWSE_HANDLER_JS_PATH}";


jsUbuntu.boot();
jsFileSystem.createDir(
	"${FILE_MANAGER_LIST_DIR_PATH}"
);
jsFileSystem.createDir(
	"${FILE_MANAGER_TEMP_DIR_PATH}"
);

let preRegistDirList = [
	`/storage/emulated/0/Documents/cmdclick/AppDir/default`,
	`/home/cmdclick`,
	"${DELETE_DIR_PATH_LIST}",
];
preRegisterListCon(
	preRegistDirList,
	"${FILE_MANAGER_LIST_DIR_PATH}",
	"${FILE_MANAGER_DIR_LIST_TXT_PATH}",
);

let preRegistRootDirList = [
	`/`,
];
preRegisterListCon(
	preRegistRootDirList,
	"${FILE_MANAGER_LIST_DIR_PATH}",
	"${FILE_MANAGER_ROOT_DIR_LIST_TXT_PATH}",
);

const selectDirPath = readCmdVal("DIR_PATH_LIST");
browseHandler(selectDirPath);

function preRegisterListCon(
	preListCon,
	dirPath,
	listFilePath,
){
	const dirPathList = jsFileSystem.readLocalFile(
		listFilePath
	).split("\n");
	preListCon.forEach(function(path){
		if(dirPathList.includes(path)) return;
		updateDirPathList(
			path,
			dirPath,
			listFilePath,
			false,
		);
	});
};