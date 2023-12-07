
jsimport `${sshTerminalUpdateSearchWordListJsPath}`;

jsScript.readCmdValsCon("${0}");
cmdInput = jsScript.getCmdVal(
    "cmdInput",
);

updateSearchWordList(
    cmdInput,
    `${sshTerminalListDirPath}`,
    `${sshTerminalCmdListFilePath}`,
);
