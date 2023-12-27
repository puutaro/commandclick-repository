
function makeCreatorJSPathForBookmarkList(
    dirPath,
){
    var fannelStoreBookMarkNameSrc = `${fannelStoreBookmarkName}`;
    if(!fannelStoreBookMarkNameSrc){
        fannelStoreBookMarkNameSrc = `${fannelStoreBookmarkDefaultName}`;
    }
    fannelStoreBookMarkNameSrc = jsPath.compPrefix(
        fannelStoreBookMarkNameSrc,
        `${FANNEL_STORE_PREFIX}`
    );
    const compFannelStoreBookMarkName = jsPath.compExtend(
        fannelStoreBookMarkNameSrc,
        `${TSV_SUFFIX}`,
    );
    return [dirPath, compFannelStoreBookMarkName].join('/');
}