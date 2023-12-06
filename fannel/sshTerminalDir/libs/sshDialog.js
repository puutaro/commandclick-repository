


function launchSshDialog() {
    let setVariableContents = [
        `userName:LBL:TXT:ELSB=${TXT_LABEL}=this|${LIST_PATH}=${sshTerminalUserNameListTxtPath}!${LIMIT_NUM}=10!${INIT_MARK}=DELETE`,
        `address:LBL:TXT:ELSB=${TXT_LABEL}=this|${LIST_PATH}=${sshTerminalAddressListTxtPath}!${LIMIT_NUM}=10!${INIT_MARK}=DELETE`,
        `port:TXT:LBL:NUM:ELSB=${TXT_LABEL}=this|!1..100!1|${LIST_PATH}=${sshTerminalPortListTxtPath}!${LIMIT_NUM}=10!${INIT_MARK}=22!${INIT_VALUE}=22`,
        `sshPass:LBL:TXT:ELSB=${TXT_LABEL}=this|${LIST_PATH}=${sshTerminalSshPassListTxtPath}!${LIMIT_NUM}=10!${INIT_MARK}=DELETE`,
        `keyPhase:LBL:CB=${TXT_LABEL}=this|NO!SET_UP!USE`
    ].join("\t");
    const curUserName = jsScript.readCmdVal(
        "userName",
        `${sshTerminalPath}`
    );
    const curAddress = jsScript.readCmdVal(
        "address",
        `${sshTerminalPath}`
    );
    const curPort = jsScript.readCmdVal(
        "port",
        `${sshTerminalPath}`
    );
    const curSshPass = jsScript.readCmdVal(
        "sshPass",
        `${sshTerminalPath}`
    );
    const curKeyPhase = jsScript.readCmdVal(
        "keyPhase",
        `${sshTerminalPath}`
    );
    let cmdVariables = [
        `userName=${curUserName}`,
        `address=${curAddress}`,
        `port=${curPort}`,
        `sshPass=${curSshPass}`,
        `keyPhase=${curKeyPhase}`
    ].join("\t");
    const canncelReturnCode = "1";
    const returnCodeStr = jsValEdit.editAndSaveCmdVar(
        "Exec SSH",
        `${sshTerminalPath}`,
        setVariableContents,
        cmdVariables,
    );
    if(
        returnCodeStr === canncelReturnCode
    ) return;
    const updateUserName = jsScript.readCmdVal(
        "userName",
        `${sshTerminalPath}`
    );
    const updateAddress = jsScript.readCmdVal(
        "address",
        `${sshTerminalPath}`
    );
    const updatePort = jsScript.readCmdVal(
        "port",
        `${sshTerminalPath}`
    );
    const updateSshPass = jsScript.readCmdVal(
        "sshPass",
        `${sshTerminalPath}`
    );
    const updateKeyPhase = jsScript.readCmdVal(
        "keyPhase",
        `${sshTerminalPath}`
    );
    jsListSelect.updateListFileCon(
        `${sshTerminalUserNameListTxtPath}`,
        updateUserName
    );
    jsListSelect.updateListFileCon(
        `${sshTerminalAddressListTxtPath}`,
        updateAddress
    );
    jsListSelect.updateListFileCon(
        `${sshTerminalPortListTxtPath}`,
        updatePort
    );
    jsListSelect.updateListFileCon(
        `${sshTerminalSshPassListTxtPath}`,
        updateSshPass
    );
    const sshCmd = makeSshCmd(
        updateUserName,
        updateAddress ,
        updatePort,
        updateSshPass,
        updateKeyPhase,
    );
    jsSendKey.send(sshCmd);
    jsSendKey.send("${ENTER}");
}

function makeSshCmd(
    updateUserName,
    updateAddress ,
    updatePort,
    updateSshPass,
    updateKeyPhase,
) {
    if(
        !updateSshPass
        && updateKeyPhase === "NO"
    ) {
        jsToast.short("keyPhase must be OFF when sshPass is blank");
        exitZero();
    }
    const specifyPort =
        updatePort.trim()
            .replace(/^$/, "22");
    if(updateKeyPhase === "NO"){
        jsToast.short(`not on: ${updateKeyPhase}`);
        return [
            `sshpass -p ${updateSshPass}`,
            `ssh`,
            `-o "StrictHostKeyChecking=no"`,
            `-o "UserKnownHostsFile=/dev/null"`,
            `-p ${specifyPort}`,
            `"${updateUserName}@${updateAddress}"`,
        ].join(" ");
    }
    return sshHandler(
        updateUserName,
        updateAddress ,
        specifyPort,
        updateKeyPhase,
        updateSshPass
    );
}

function sshHandler(
    updateUserName,
    updateAddress ,
    specifyPort,
    updateKeyPhase,
    updateSshPass
){
    switch(updateKeyPhase){
        case "NO":
            return "";
        case "USE":
            return useKeyCmd(
                updateUserName,
                updateAddress ,
                specifyPort,
                updateSshPass,
            );
        case "SET_UP":
            return makeSshCopyIdCmd(
                updateUserName,
                updateAddress ,
                specifyPort,
            );
    }
}

function makeSshCopyIdCmd(
    updateUserName,
    updateAddress ,
    updatePort,
){
    return `ssh-keygen -t rsa -b 4096;ssh-copy-id -o "StrictHostKeyChecking no" -p "${updatePort}" "${updateUserName}@${updateAddress}"`
}

function useKeyCmd(
    updateUserName,
    updateAddress ,
    specifyPort,
    updateSshPass,
){
    if(updateSshPass.trim() !== ""){
        return [
            `sshpass -p ${updateSshPass}`,
            `ssh`,
            `-o "StrictHostKeyChecking=no"`,
            `-p ${specifyPort}`,
            `"${updateUserName}@${updateAddress}"`,
        ].join(" ");
    }
    return [
        `ssh`,
        `-o "StrictHostKeyChecking=no"`,
        `-p ${specifyPort}`,
        `"${updateUserName}@${updateAddress}"`,
    ].join(" ");
}
