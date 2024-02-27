
termInput();

function termInput(){
    const inputStr = jsDialog.prompt(
        "",
        "",
        "suggest=variableName=termInput|concatFilePathList=${sshTerminalCmdListFilePath}",
    );
    if(!inputStr) exitZero();
    jsSendKey.send(inputStr);
};
