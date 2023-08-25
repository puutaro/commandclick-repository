

/// LABELING_SECTION_START
// Highlight search and web search by dialog @puutaro
// ## Support long press menu table
// ---------------

// | type | enable |
// | ----- | ----- |
// | src anchor | o |
// | src image anchor | o |
// | image | x |

/// LABELING_SECTION_END


/// SETTING_SECTION_START
setReplaceVariables="TXT_LABEL=label"
setReplaceVariables="LIST_PATH=listPath"
setReplaceVariables="BTN_CMD=cmd"
setReplaceVariables="BTN_LABEL=label"
setReplaceVariables="fannelDirPath=${01}/${001}"
setReplaceVariables="webSearcherListDirPath=${fannelDirPath}/menuList"
setReplaceVariables="centerMenuListFilePath=${webSearcherListDirPath}/centerMenuList.txt"
setReplaceVariables="rightMenuListFilePath=${webSearcherListDirPath}/rightMenuList.txt"
setReplaceVariables="srcImageAnchorMenuListFilePath=${webSearcherListDirPath}/srcImageAnchorMenuList.txt"
setReplaceVariables="srcAnchorMenuListFilePath=${webSearcherListDirPath}/srcAnchorMenuList.txt"
setReplaceVariables="imageMenuListFilePath=${webSearcherListDirPath}/imageMenuList.txt"
setVariableTypes="centerMenuListPath:DSL:BTN=${LIST_PATH}=${centerMenuListFilePath}|${BTN_CMD}=setf type=ListAdd suffix=.js dirPath=${01}!${BTN_LABEL}=ADD"
setVariableTypes="rightMenuListPath:DSL:BTN=${LIST_PATH}=${rightMenuListFilePath}|${BTN_CMD}=setf type=ListAdd suffix=.js dirPath=${01}!${BTN_LABEL}=ADD"
setVariableTypes="srcImageAnchorMenuListPath:DSL:BTN=${LIST_PATH}=${srcImageAnchorMenuListFilePath}|${BTN_CMD}=setf type=ListAdd suffix=.js dirPath=${01}!${BTN_LABEL}=ADD"
setVariableTypes="imageMenuListPath:DSL:BTN=${LIST_PATH}=${imageMenuListFilePath}|${BTN_CMD}=setf type=ListAdd suffix=.js dirPath=${01}!${BTN_LABEL}=ADD"
setVariableTypes="srcAnchorMenuListPath:DSL:BTN=${LIST_PATH}=${srcAnchorMenuListFilePath}|${BTN_CMD}=setf type=ListAdd suffix=.js dirPath=${01}!${BTN_LABEL}=ADD"
hideSettingVariables="setReplaceVariables"
hideSettingVariables="setVariableTypes"
scriptFileName="webSearcher.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
centerMenuListPath="${01}/${001}/menuList/centerMenuList.txt"
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
    const targetUrl = "CMDCLICK_LONG_PRESS_LINK_URL";
    const cmdclickLongPressLinkUrlStr = "CMDCLICK_ENCRPT_LONG_PRESS_LINK_URL".replace(
        "_ENCRPT",
        ""
    );
    if(
        targetUrl != cmdclickLongPressLinkUrlStr
    ) return targetUrl;
    return "https://www.google.co.id/search?q=";
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
            return `https://www.google.co.id/search?q=${highlightUrlString}`;
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
    jsDialog.webView(
        launchUrlString,
        "${0}",
        `onSwitch=\tmenuFilePath=${centerMenuListPath}`,
        `onSwitch=\tmenuFilePath=${rightMenuListPath}`,
        `menuFilePath=${srcImageAnchorMenuListPath}`,
        `menuFilePath=${srcAnchorMenuListPath}`,
        `menuFilePath=${imageMenuListPath}`,
    );
};