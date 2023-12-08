
jsimport `${sshTerminalUpdateSearchWordListJsPath}`;

const cmdValsCon = jsScript.readCmdValsCon("${0}");
REGISTER_EXTRA_KEY = jsScript.subValOnlyValue(
    "REGISTER_EXTRA_KEY",
    cmdValsCon,
);

updateSearchWordList(
    REGISTER_EXTRA_KEY,
    `${sshTerminalListDirPath}`,
    `${sshTerminalExtraKeyListFilePath}`,
);
