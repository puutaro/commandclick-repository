
launchBookmarkDialog();

function launchBookmarkDialog() {
    const isLaunchBookmarkByDialog =
        `${onLaunchBookmarkByDialog}` === "ON";
    const EDIT_FILE_PATH = makeCreatorJSPathForFannelStoreBookmarkList(
        `${fannelStoreEditDirPath}`,
    );
    let extraMapStr = [
        `src_path=${APP_URL_HISTORY_PATH}`,
        `on_click_sort=true`,
        'on_sortable_js=true',
        `on_click_url=true`,
        `on_dialog=${isLaunchBookmarkByDialog}`
    ].join("|");
    jsIntent.launchEditSite(
        EDIT_FILE_PATH,
        extraMapStr,
        "urlString.startsWith('https://github.com/');",
    );
}

function makeCreatorJSPathForFannelStoreBookmarkList(
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