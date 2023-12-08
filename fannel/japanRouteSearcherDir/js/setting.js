

const cmdValsCon = jsScript.readCmdValsCon("${0}");
onLaunchBookmarkByDialog = jsScript.subValOnlyValue(
    "onLaunchBookmarkByDialog",
    cmdValsCon
);
lang = jsScript.subValOnlyValue(
    "lang",
    cmdValsCon
);
const setVariableContents = [
    `onLaunchBookmarkByDialog:LBL:CB=${TXT_LABEL}=On launch bookmark by dialog|ON!OFF`,
    `lang:LBL:CB=${TXT_LABEL}=On launch bookmark by dialog|en!ja`
].join("\t");
const varNameValCon = [
    `onLaunchBookmarkByDialog=${onLaunchBookmarkByDialog}`,
    `lang=${lang}`
].join("\t");
jsValEdit.editAndSaveCmdVar(
    "Setting",
    `${japanRouteSearcherFannelPath}`,
    setVariableContents,
    varNameValCon,
);
