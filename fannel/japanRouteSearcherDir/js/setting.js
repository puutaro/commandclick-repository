

const setVariableContents = [
    `onLaunchBookmarkByDialog:LBL:CB=${TXT_LABEL}=On launch bookmark by dialog|ON?OFF`,
    `lang:LBL:CB=${TXT_LABEL}=On launch bookmark by dialog|en?ja`
].join("\n");
const varNameValCon = [
    `onLaunchBookmarkByDialog=${onLaunchBookmarkByDialog}`,
    `lang=${lang}`
].join("\n");
jsValEdit.editAndSaveCmdVar(
    "Setting",
    `${japanRouteSearcherFannelPath}`,
    setVariableContents,
    varNameValCon,
);
