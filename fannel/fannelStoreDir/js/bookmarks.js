
launchBookmarkDialog();

function launchBookmarkDialog() {
    const cmdValsCon = jsScript.readCmdValsCon("${0}");
    const onLaunchBookmarkByDialog = jsScript.subValOnlyValue(
        "onLaunchBookmarkByDialog",
        cmdValsCon,
    ) === "ON";
    const EDIT_FILE_PATH = makeCreatorJSPathForFannelStoreBookmarkList(
        `${fannelStoreEditDirPath}`,
        cmdValsCon,
    );

    let extraMapStr = [
        `src_path=${APP_URL_HISTORY_PATH}`,
        `on_click_sort=true`,
        'on_sortable_js=true',
        `on_click_url=true`,
        `on_dialog=${onLaunchBookmarkByDialog}`
    ].join("|");
    jsIntent.launchEditSite(
        EDIT_FILE_PATH,
        extraMapStr,
        "urlString.startsWith('https://github.com/');",
    );
}

function makeCreatorJSPathForFannelStoreBookmarkList(
    dirPath,
    cmdValsCon,
){
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
    const fannelStoreBookMarkName = jsPath.compExtend(
        fannelStoreBookMarkNameSrc,
        `${TSV_SUFFIX}`,
    );
    return [dirPath, fannelStoreBookMarkName].join('/');
}