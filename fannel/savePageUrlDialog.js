

/// SETTING_SECTION_START
setReplaceVariables="file://"
/// SETTING_SECTION_END


const urlString = makeUrl();
if(!urlString) exitZero();
launchWebview(urlString);


function launchWebview(launchUrlString){
    const menuMapStrListStr= makeMenuMapStr();
    const longPressMenuListStr = [
        `srcImageAnchorMenuFilePath=${srcImageAnchorMenuListFilePath}`,
        `srcAnchorMenuFilePath=${srcAnchorMenuListFilePath}`,
    ].join("|");
    const webViewConfigMapCon = [
        `toolBar=${menuMapStrListStr}`,
        `longPressMenu=${longPressMenuListStr}`,
    ].join(",");
    jsDialog.webView_S(
        launchUrlString,
        "${0}",
        webViewConfigMapCon,
    );
};


function makeUrl(){
    const externalExecLink = "${EXTERNAL_EXEC_REPLACE_TXT1}";
    const cmdclickExternalExecReplaceTextStr = "${ENCRPT_EXTERNAL_EXEC_REPLACE_TXT1}".replace(
        "ENCRPT_",
        ""
    );
    if(
        externalExecLink !== cmdclickExternalExecReplaceTextStr
        && externalExecLink !== ""
    ) return externalExecLink;
    return "https://www.google.com/search?q=";
}

function makeMenuMapStr(){
    const onSearchBtn = `${EXTERNAL_EXEC_REPLACE_TXT2}`;
    switch(true){
        case onSearchBtn === "OFF":
            return [
                `clickMenuFilePath=${leftMenuListFilePath}?longPressMenuFilePath=${leftLongPressMenuListFilePath}?dismissType=longpress?caption=back?iconName=back`,
                `clickMenuFilePath=${rightMenuListFilePath}?caption=sveUrl?iconName=download_done`,
            ].join("|");
        default:
            return [
                `clickMenuFilePath=${leftMenuListFilePath}?longPressMenuFilePath=${leftLongPressMenuListFilePath}?dismissType=longpress?caption=back?iconName=back`,
                `clickMenuFilePath=${centerMenuListFilePath}?longPressMenuFilePath=${centerLongPressMenuListFilePath}?caption=search?iconName=google`,
                `clickMenuFilePath=${rightMenuListFilePath}?caption=sveUrl?iconName=download_done`,
            ].join("|");
    }
}