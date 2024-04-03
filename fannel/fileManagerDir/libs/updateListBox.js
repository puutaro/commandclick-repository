

function updateListBox(
	registerWord,
	listDirPath,
	listFilePath,
	onRegisterToast = true,
){
 	if(
		!registerWord
	) {
		jsToast.short("Must not be blank");
		return;
	};
	jsFileSystem.createDir(
		listDirPath
	);
	jsListSelect.updateListFileCon(
		listFilePath,
		registerWord
	);
	if(!onRegisterToast) return;
	jsToast.short(
		`Register ok:\n ${registerWord}`
	);
};
