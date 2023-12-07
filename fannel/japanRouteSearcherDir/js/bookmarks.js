
jsimport `${japanRouteSearcherMakeCreatorTsvPathForBookmarkListJsPath}`;

launchBookmarkDialog();

function launchBookmarkDialog() {
    jsScript.readCmdValsCon("${0}");
    const onLaunchBookmarkByDialog = jsScript.getCmdVal(
        "onLaunchBookmarkByDialog",
    ) === "ON";
    const EDIT_FILE_PATH = makeCreatorJSPathForBookmarkList(
        `${japanRouteSearcherEditDirPath}`,
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
        "urlString.startsWith('https://world.jorudan.co.jp/');",
    );
}
