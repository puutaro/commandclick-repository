

jsScript.readCmdValsCon("${0}");
ON_AUTO_LAUNCH_SSH_DIALOG = jsScript.getCmdVal(
    "ON_AUTO_LAUNCH_SSH_DIALOG",
);
const setVariableContents = [
    `ON_AUTO_LAUNCH_SSH_DIALOG:LBL:CB=${TXT_LABEL}=is auto launch ssh dialog|ON!OFF`,
].join("\t");
const varNameValCon = [
    `ON_AUTO_LAUNCH_SSH_DIALOG=${ON_AUTO_LAUNCH_SSH_DIALOG}`,
].join("\t");
jsValEdit.editAndSaveCmdVar(
    "Setting",
    `${sshTerminalPath}`,
    setVariableContents,
    varNameValCon,
);
