

const setVariableContents = [
    `onLaunchBookmarkByDialog:LBL:CB=${TXT_LABEL}=On launch bookmark by dialog|ON?OFF`,
].join("\n");
const varNameValCon = [
    `onLaunchBookmarkByDialog=${onLaunchBookmarkByDialog}`,
].join("\n");
jsValEdit.editAndSaveCmdVar(
    "Setting",
    `${fannelStoreFannelPath}`,
    setVariableContents,
    varNameValCon,
);
