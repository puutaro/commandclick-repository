
jsimport `${sshTerminalUpdateSearchWordListJsPath}`;

cmdInput = jsScript.readCmdVal(
    "cmdInput",
    `${sshTerminalPath}`,
);

updateSearchWordList(
    cmdInput,
    `${sshTerminalListDirPath}`,
    `${sshTerminalCmdListFilePath}`,
);
