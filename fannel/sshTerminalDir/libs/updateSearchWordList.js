
function updateSearchWordList(
    registerWord,
    listDirPath,
    listFilePath,
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
    jsToast.short(
        `Register ok:\n${registerWord}`
    );
};
