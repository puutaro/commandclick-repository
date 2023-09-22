

/// LABELING_SECTION_START
// file://${01}/${001}/cmdTerminal.md
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
onAutoExec="ON"
onTermBackendWhenStart="OFF"
onTermVisibleWhenKeyboard="ON"
onTermShortWhenLoad="ON"
disableShowToolbarWhenHighlight="ON"
disableWideViewPort="ON"
onUrlHistoryRegister="OFF"
setReplaceVariables="file://${01}/${001}/settingVariables/setReplaceVariables.js"
setVariableTypes="file://${01}/${001}/settingVariables/setVariableTypes.js"
hideSettingVariables="file://${01}/${001}/settingVariables/hideSettingVariables.js"
scriptFileName="cmdTerminal.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
sendkeys1=""
sendkeys2=""
sendkeys3=""
cmdInput=""
REGISTER_EXTRA_KEY=""
/// CMD_VARIABLE_SECTION_END


let args = jsArgs.get().split("\t");
var FIRST_ARGS = args.at(0);


switch(FIRST_ARGS){
  case "onAutoExec":
    launchTerminal();
    break;
  case "${CTRL_C}": 
    jsSendKey.send("${CTRL_C}");
    break;
  case "${CTRL_Z}": 
    jsSendKey.send("${CTRL_Z}");
    brxeak;
  case "${UP}": 
    jsSendKey.send("${UP}");
    break;
  case "${DOWN}": 
    jsSendKey.send("${DOWN}");
    break;
  case "${LEFT}": 
    jsSendKey.send("${LEFT}");
    break;
  case "${RIGHT}": 
    jsSendKey.send("${RIGHT}");
    break;
  case "${INPUT}": 
    termInput();
    break;
  case "${PAGE_DOWN}": 
    jsSendKey.send("${PAGE_DOWN}");
    break;
  case "${PAGE_UP}": 
    jsSendKey.send("${PAGE_UP}");
    break;
  case "${ESC}": 
    jsSendKey.send("${ESC}");
    break;
  case "${HOME}": 
    jsSendKey.send("${HOME}");
    break;
  case "${END}": 
    jsSendKey.send("${END}");
    break;
  case "${ENTER}": 
    jsSendKey.send("${ENTER}");
    break;
  case "${BACKSPACE}": 
    jsSendKey.send("${BACKSPACE}");
    break;
  case "${COPY}": 
    execCopy();
    // jsSendKey.send("${COPY}");
    break;
  case "${PASTE}": 
    jsSendKey.send("${PASTE}");
    break;
  case "${SPACE}": 
    jsSendKey.send("${SPACE}");
    break;
  case "${CMD_INPUT}":
    updateSeachWordList(
      cmdInput.trim(),
      "${CMD_INPUT}",
      "${cmdTerminalListDirPath}",
      "${cmdTerminalCmdListFilePath}",
    );
  case "${REGISTER_EXTRA_KEY}":
    updateSeachWordList(
      REGISTER_EXTRA_KEY.trim(),
      "${REGISTER_EXTRA_KEY}",
      "${cmdTerminalListDirPath}",
      "${cmdTerminalExtraKeyListFilePath}",
    );
    break;
};


function updateSeachWordList(
  registerWord,
  targetArgs,
  listDirPath,
  listFilePath,
){
  if(
    FIRST_ARGS != targetArgs
  ) return;
  if(
    !registerWord
  ) {
    jsToast.short("Must not be blank");
    return;
  };
  jsFileSystem.createDir(
    listDirPath
  );
  jsListSelect.updateListFileCon(
    listFilePath,
    registerWord
  );
  jsToast.short(
    `Register ok:\n ${registerWord}`
  );
};


function launchTerminal(){
  const deviceIpv4 = jsNetTool.getIpv4();
  const terminalUrl = `http://192.168.0.4:18080/?hostname=192.168.0.4&port=10022&username=cmdclick&password=Y21kY2xpY2s=&command=script%20-qf%20script.log`;
  // "http://192.168.0.4:8080/?hostname=192.168.0.4&port=10022&username=cmdclick&password=Y21kY2xpY2s="
  jsUrl.loadUrl(terminalUrl);
};

function execCopy() {
  const fileDirPath = jsPath.echoPath("appFiles");
  const scriptLogPath = `${fileDirPath}/1/rootfs/home/cmdclick/script.log`;
  const scriptLogCon = jsFileSystem.readLocalFile(
    scriptLogPath
  ).replaceAll(
      "\n",
      "</br>"
  ).replaceAll(
      /[\u001b\u009b][\[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      ""
  ).replaceAll(
      /[\x00-\x1F\x7F-\xA0]+/g,
      ""
  ).replaceAll(
      "\n",
      "</br>"
  ).replaceAll(
      /(cmdclick@localhost)/g,
      "</br><span style=\"color:green;font-weight: bold;\">$1</span>"
  ).replaceAll(
    /\]0\;\n*/g, ""
  );
  const txtHtmlCon = jsHtml.txtHtml(
    scriptLogCon ,
    true,
  );
  jsDialog.webView(
    `textCon://${txtHtmlCon}`,
    "",
    `clickMenuFilePath=${cmdTerminalMenuListFilePath}!dismissType=click!iconName=copy!dismissDelayMiliTime=200`,
    "",
  );
};


function termInput(){
  const inputStr = prompt();
  if(!inputStr) exitZero();
  jsSendKey.send(inputStr)
};
