
launchEditBookmarkDialgog();

function launchEditBookmarkDialgog() {
    jsFileSelect.execEditTargetFileName(
        "japanRouteSearcherBookmarkName",
        "renameJapanRouteSearcherBookmarkName",
        `${japanRouteSearcherEditDirPath}`,
        `japanRouteSearcherBookmarkName:TXT:FSB=${FCB_DIR_PATH}=${japanRouteSearcherEditDirPath}!${FCB_PREFIX}=${ROUTE_PREFIX}!${FCB_SUFFIX}=${TSV_SUFFIX}`,
        `japanRouteSearcherBookmarkName=${japanRouteSearcherBookmarkName}\trenameJapanRouteSearcherBookmarkName=`,
        `${ROUTE_PREFIX}`,
        `${TSV_SUFFIX}`,
        `${japanRouteSearcherFannelPath}`,
        "Edit bookmark"
    );
}