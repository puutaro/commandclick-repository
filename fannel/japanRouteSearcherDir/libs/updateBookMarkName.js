
function updateBookMarkName() {
    const bookmarkName = makeCreatorJSPathForBookmarkList(
        `${japanRouteSearcherEditDirPath}`,
    );
    jsEdit.updateByVariable(
        `${japanRouteSearcherFannelPath}`,
        "japanRouteSearcherBookmarkName",
        jsPath.basename(bookmarkName),
    );
}
