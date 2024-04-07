

const setVariableContents = [
    `ON_AUTO_LAUNCH_SSH_DIALOG:LBL:CB=${TXT_LABEL}=is auto launch ssh dialog|ON?OFF`,
].join("\n");
const varNameValCon = [
    `ON_AUTO_LAUNCH_SSH_DIALOG=${ON_AUTO_LAUNCH_SSH_DIALOG}`,
].join("\n");
jsValEdit.editAndSaveCmdVar(
    "Setting",
    `${FANNEL_PATH}`,
    setVariableContents,
    varNameValCon,
);
