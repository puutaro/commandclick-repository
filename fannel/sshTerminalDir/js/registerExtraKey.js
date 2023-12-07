
jsimport `${sshTerminalUpdateSearchWordListJsPath}`;

jsScript.readCmdValsCon("${0}");
REGISTER_EXTRA_KEY = jsScript.getCmdVal(
    "REGISTER_EXTRA_KEY",
);

updateSearchWordList(
    REGISTER_EXTRA_KEY,
    `${sshTerminalListDirPath}`,
    `${sshTerminalExtraKeyListFilePath}`,
);
