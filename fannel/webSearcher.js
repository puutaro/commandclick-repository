

/// LABELING_SECTION_START
// https://github.com/puutaro/webSearcher
/// LABELING_SECTION_END


/// SETTING_SECTION_START
setReplaceVariables="TXT_LABEL=label"
setReplaceVariables="LIST_PATH=listPath"
setReplaceVariables="BTN_CMD=cmd"
setReplaceVariables="BTN_LABEL=label"
setReplaceVariables="fannelDirPath=${01}/${001}"
setReplaceVariables="webSearcherListDirPath=${fannelDirPath}/menuList"
setReplaceVariables="leftMenuListFilePath=${webSearcherListDirPath}/leftMenuList.txt"
setReplaceVariables="leftLongPressMenuListFilePath=${webSearcherListDirPath}/leftLongPressMenuList.txt"
setReplaceVariables="centerMenuListFilePath=${webSearcherListDirPath}/centerMenuList.txt"
setReplaceVariables="centerLongPressMenuListFilePath=${webSearcherListDirPath}/centerLongPressMenuList.txt"
setReplaceVariables="rightMenuListFilePath=${webSearcherListDirPath}/rightMenuList.txt"
setReplaceVariables="srcImageAnchorMenuListFilePath=${webSearcherListDirPath}/srcImageAnchorMenuList.txt"
setReplaceVariables="srcAnchorMenuListFilePath=${webSearcherListDirPath}/srcAnchorMenuList.txt"
setReplaceVariables="imageMenuListFilePath=${webSearcherListDirPath}/imageMenuList.txt"
setVariableTypes="leftMenuListPath:DSL:BTN=${LIST_PATH}=${leftMenuListFilePath}|${BTN_CMD}=setf type=ListAdd suffix=.js dirPath=${01}?${BTN_LABEL}=ADD"
setVariableTypes="leftLongPressMenuListPath:DSL:BTN=${LIST_PATH}=${leftLongPressMenuListFilePath}|${BTN_CMD}=setf type=ListAdd suffix=.js dirPath=${01}?${BTN_LABEL}=ADD"
setVariableTypes="centerMenuListPath:DSL:BTN=${LIST_PATH}=${centerMenuListFilePath}|${BTN_CMD}=setf type=ListAdd suffix=.js dirPath=${01}?${BTN_LABEL}=ADD"
setVariableTypes="centerLongPressMenuListPath:DSL:BTN=${LIST_PATH}=${centerLongPressMenuListFilePath}|${BTN_CMD}=setf type=ListAdd suffix=.js dirPath=${01}?${BTN_LABEL}=ADD"
setVariableTypes="rightMenuListPath:DSL:BTN=${LIST_PATH}=${rightMenuListFilePath}|${BTN_CMD}=setf type=ListAdd suffix=.js dirPath=${01}?${BTN_LABEL}=ADD"
setVariableTypes="srcImageAnchorMenuListPath:DSL:BTN=${LIST_PATH}=${srcImageAnchorMenuListFilePath}|${BTN_CMD}=setf type=ListAdd suffix=.js dirPath=${01}?${BTN_LABEL}=ADD"
setVariableTypes="imageMenuListPath:DSL:BTN=${LIST_PATH}=${imageMenuListFilePath}|${BTN_CMD}=setf type=ListAdd suffix=.js dirPath=${01}?${BTN_LABEL}=ADD"
setVariableTypes="srcAnchorMenuListPath:DSL:BTN=${LIST_PATH}=${srcAnchorMenuListFilePath}|${BTN_CMD}=setf type=ListAdd suffix=.js dirPath=${01}?${BTN_LABEL}=ADD"
hideSettingVariables="setReplaceVariables"
hideSettingVariables="setVariableTypes"
scriptFileName="webSearcher.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
leftMenuListPath="${01}/${001}/menuList/leftMenuList.txt"
leftLongPressMenuListPath="${01}/${001}/menuList/leftLongPressMenuList.txt"
centerMenuListPath="${01}/${001}/menuList/centerMenuList.txt"
centerLongPressMenuListPath="${01}/${001}/menuList/centerLongPressMenuList.txt"
rightMenuListPath="${01}/${001}/menuList/rightMenuList.txt"
srcImageAnchorMenuListPath="${01}/${001}/menuList/srcImageAnchorMenuList.txt"
srcAnchorMenuListPath="${01}/${001}/menuList/srcAnchorMenuList.txt"
imageMenuListPath="${01}/${001}/menuList/imageMenuList.txt"
/// CMD_VARIABLE_SECTION_END



let prefixEnum = {
    https: "https://",
    http: "http://",
    file: "file://",
};


highLightSearch();
const urlString = makeUrl();
if(!urlString) exitZero();
launchWebview(urlString);


function makeUrl(){
    const targetUrl = "${LONG_PRESS_LINK_URL}";
    const cmdclickLongPressLinkUrlStr = "${ENCRPT_LONG_PRESS_LINK_URL}".replace(
        "ENCRPT_",
        ""
    );
    if(
        targetUrl !== cmdclickLongPressLinkUrlStr
    ) return targetUrl;
    const externalEexcLink = "${EXTERNAL_EXEC_REPLACE_TXT1}";
    const cmdclickExternalExecReplaceTextStr =
        "${ENCRPT_EXTERNAL_EXEC_REPLACE_TXT1}".replace(
        "ENCRPT_",
        ""
    );
    if(
        externalEexcLink !== ""
        && externalEexcLink !== cmdclickExternalExecReplaceTextStr
    ) return externalEexcLink;
    return "GGLE_SEARCH";
};

function highLightSearch(){
    const highlightUrlString = getSelectionText();
    if(
        !highlightUrlString
    ) return;
    const highlightUrl = appendUrlPrefix(highlightUrlString);
    launchWebview(highlightUrl);
    exitZero();
};

function appendUrlPrefix(highlightUrlString){
    switch(true){
        case highlightUrlString.startsWith(prefixEnum.https):
        case highlightUrlString.startsWith(prefixEnum.http):
        case highlightUrlString.startsWith(prefixEnum.file):
            return highlightUrlString;
            break;
        case true:
            const highlightUrlStringWithEncode = encodeURIComponent(highlightUrlString);
            return `https://www.google.co.id/search?q=${highlightUrlStringWithEncode}`;
            break;
    };
};

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
        window.getSelection().removeAllRanges();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    };
    return text;
};


function launchWebview(launchUrlString){
    const menuMapStrListStr= [
        `clickMenuFilePath=${leftMenuListPath}?longPressMenuFilePath=${leftLongPressMenuListPath}?dismissType=longpress?label=⬅`,
        `clickMenuFilePath=${centerMenuListPath}?longPressMenuFilePath=${centerLongPressMenuListPath}?label=🔎️`,
        `clickMenuFilePath=${rightMenuListPath}?label=⬇︎️`,
    ].join("|");
    const longPressMenuListStr = [
        `srcImageAnchorMenuFilePath=${srcImageAnchorMenuListPath}`,
        `srcAnchorMenuFilePath=${srcAnchorMenuListPath}`,
        `imageMenuFilePath=${imageMenuListPath}`,
    ].join("?");
    jsDialog.webView_S(
        launchUrlString,
        "${0}",
        menuMapStrListStr,
        longPressMenuListStr,
        "",
    );
};