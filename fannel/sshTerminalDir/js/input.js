
termInput();

function termInput(){
    const inputStr = jsDialog.prompt(
        "",
        "",
        "variableName=termInput|concatFilePathList=${sshTerminalCmdListFilePath}",
    );
    if(!inputStr) exitZero();
    jsSendKey.send(inputStr);
};
