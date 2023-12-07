
function updateBookMarkName() {
    const bookmarkName = makeCreatorJSPathForBookmarkList(
        `${fannelStoreEditDirPath}`,
    );
    jsEdit.updateByVariable(
        `${fannelStoreFannelPath}`,
        "fannelStoreBookmarkName",
        jsPath.basename(bookmarkName),
    );
}
