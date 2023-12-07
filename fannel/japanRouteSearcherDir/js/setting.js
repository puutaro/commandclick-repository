

jsScript.readCmdValsCon("${0}");
onLaunchBookmarkByDialog = jsScript.getCmdVal(
    "onLaunchBookmarkByDialog",
);
lang = jsScript.getCmdVal(
    "lang",
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
