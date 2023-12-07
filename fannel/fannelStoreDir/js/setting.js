

jsScript.readCmdValsCon("${0}");
onLaunchBookmarkByDialog = jsScript.getCmdVal(
    "onLaunchBookmarkByDialog",
);
const setVariableContents = [
    `onLaunchBookmarkByDialog:LBL:CB=${TXT_LABEL}=On launch bookmark by dialog|ON!OFF`,
].join("\t");
const varNameValCon = [
    `onLaunchBookmarkByDialog=${onLaunchBookmarkByDialog}`,
].join("\t");
jsValEdit.editAndSaveCmdVar(
    "Setting",
    `${fannelStoreFannelPath}`,
    setVariableContents,
    varNameValCon,
);
