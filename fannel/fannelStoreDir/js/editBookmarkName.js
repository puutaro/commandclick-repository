
launchEditBookmarkDialgog();

function launchEditBookmarkDialgog() {
    jsScript.readCmdValsCon("${0}");
    const fannelStoreBookmarkName = jsScript.getCmdVal(
        "fannelStoreBookmarkName",
    );
    jsFileSelect.execEditTargetFileName(
        "fannelStoreBookmarkName",
        "renameFannelStoreBookmarkName",
        `${fannelStoreEditDirPath}`,
        `fannelStoreBookmarkName:TXT:FSB=${FCB_DIR_PATH}=${fannelStoreEditDirPath}!${FCB_PREFIX}=${FANNEL_STORE_PREFIX}!${FCB_SUFFIX}=${TSV_SUFFIX}`,
        `fannelStoreBookmarkName=${fannelStoreBookmarkName}\trenameFannelStoreBookmarkName=`,
        `${FANNEL_STORE_PREFIX}`,
        `${TSV_SUFFIX}`,
        `${fannelStoreFannelPath}`,
        "Edit bookmark"
    );
}