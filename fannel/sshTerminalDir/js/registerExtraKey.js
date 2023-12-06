
jsimport `${sshTerminalUpdateSearchWordListJsPath}`;

REGISTER_EXTRA_KEY = jsScript.readCmdVal(
    "REGISTER_EXTRA_KEY",
    `${sshTerminalPath}`,
);

updateSearchWordList(
    REGISTER_EXTRA_KEY,
    `${sshTerminalListDirPath}`,
    `${sshTerminalExtraKeyListFilePath}`,
);
