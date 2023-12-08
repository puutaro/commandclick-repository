
function makeCreatorJSPathForBookmarkList(
    dirPath,
){
    const cmdValsCon = jsScript.readCmdValsCon("${0}");
    var fannelStoreBookMarkNameSrc = jsScript.subValOnlyValue(
        "fannelStoreBookmarkName",
        cmdValsCon,
    );
    if(!fannelStoreBookMarkNameSrc){
        fannelStoreBookMarkNameSrc = `${fannelStoreBookmarkDefaultName}`;
    }
    fannelStoreBookMarkNameSrc = jsPath.compPrefix(
        fannelStoreBookMarkNameSrc,
        `${FANNEL_STORE_PREFIX}`
    );
    const fannelStoreSearcherBookMarkName = jsPath.compExtend(
        fannelStoreBookMarkNameSrc,
        `${TSV_SUFFIX}`,
    );
    return [dirPath, fannelStoreSearcherBookMarkName].join('/');
}