

/// LABELING_SECTION_START
// Pulse audio reciever @puutaro

// ## Cmd Variables
// --------
// ### pcIpAddress
// PC's ip address

// ### PLAY
//  Start pluse reciever server

// ### STOP
//  Stop pluse reciever server

/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
setReplaceVariables="TXT_LABEL=label"
setReplaceVariables="BTN_CMD=cmd"
setReplaceVariables="BTN_LABEL=label"
setReplaceVariables="LIST_PATH=listPath"
setReplaceVariables="LIMIT_NUM=limitNum"
setReplaceVariables="pulseReceiverDirPath=${01}/${001}"
setReplaceVariables="pulseReceiverListDirPath=${pulseReceiverDirPath}/list"
setReplaceVariables="pulseReceiverAddressListFilePath=${pulseReceiverListDirPath}/addressList.txt"
setReplaceVariables="pulseReceiverPortListFilePath=${pulseReceiverListDirPath}/portList.txt"
setVariableTypes="pcIpAddress:LBL:TXT:ELSB=${TXT_LABEL}=this|${LIST_PATH}=${pulseReceiverAddressListFilePath}!${LIMIT_NUM}=10"
setVariableTypes="STOP:BTN:HL=${BTN_CMD}=jsf '${0}' stop !${BTN_LABEL}=this"
hideSettingVariables="editExecute"
hideSettingVariables="setReplaceVariables"
hideSettingVariables="setVariableTypes"
scriptFileName="pulseReceiver.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
pcIpAddress=""
STOP=""
/// CMD_VARIABLE_SECTION_END


const stopMode = "stop";
const serverPort = 10080;

endJudge();
jsFileSystem.createDir("${pulseReceiverListDirPath}");
switcher();


function endJudge(){
    if(!pcIpAddress) exitZero();
};


function switcher(){
    let args = jsArgs.get().split("\t");
    const firstArgs = args.at(0);
    switch(firstArgs){
        case "":
            startPluseServer();
            break;
        case stopMode:
            jsPulseAudioReceiver.stop();  
            break;
    };
};

function startPluseServer(){
    jsListSelect.updateListFileCon(
        "${pulseReceiverAddressListFilePath}",
        pcIpAddress
    );
    jsPulseAudioReceiver.start(
        pcIpAddress,
        serverPort
    );
};
