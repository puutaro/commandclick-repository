
jsimport `${japanRouteSearcherMakeCreatorTsvPathForBookmarkListJsPath}`;

launchBookmarkDialog();

function launchBookmarkDialog() {
    const isLaunchBookmarkByDialog =
        `${onLaunchBookmarkByDialog}` === "ON";
    const EDIT_FILE_PATH = makeCreatorJSPathForBookmarkList(
        `${japanRouteSearcherEditDirPath}`,
    );

    const latestUrlTitleFilterJs = `(function(){
        return latestUrlTitleSrc.replace(
            "This is the transit route of the search result", 
            ""
        ).replace(/Japan Transit Planner.*$/, "")
        .trim();
    })();`.replaceAll("\n", "");

    let extraMapStr = [
        `latest_url_title_filter_code=` + latestUrlTitleFilterJs,
        `src_path=${APP_URL_HISTORY_PATH}`,
        `on_click_sort=true`,
        'on_sortable_js=true',
        `on_click_url=true`,
        `on_dialog=${isLaunchBookmarkByDialog}`
    ].join("|");
    jsIntent.launchEditSite(
        EDIT_FILE_PATH,
        extraMapStr,
        "urlString.startsWith('https://world.jorudan.co.jp/');",
    );
}
