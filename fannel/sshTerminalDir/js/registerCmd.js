
jsimport `${sshTerminalUpdateSearchWordListJsPath}`;

const cmdValsCon = jsScript.readCmdValsCon("${0}");
cmdInput = jsScript.subValOnlyValue(
    "cmdInput",
    cmdValsCon,
);

updateSearchWordList(
    cmdInput,
    `${sshTerminalListDirPath}`,
    `${sshTerminalCmdListFilePath}`,
);
