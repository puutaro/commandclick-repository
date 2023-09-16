

/// SETTING_SECTION_START
editExecute="ALWAYS"
onAutoExec="ON"
onTermBackendWhenStart="ON"
onTermVisibleWhenKeyboard="ON"
onTermShortWhenLoad="ON"
setReplaceVariables="TXT_LABEL=label"
setReplaceVariables="BTN_CMD=cmd"
setReplaceVariables="BTN_LABEL=label"
setReplaceVariables="file://${01}/${001}/settingVariables/setReplaceVariables.js"
setVariableTypes="file://${01}/${001}/settingVariables/setVariableTypes.js"
hideSettingVariables="file://${01}/${001}/settingVariables/hideSettingVariables.js"
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
terminalFocus();

switch(FIRST_ARGS){
  case "onAutoExec":
    jsUrl.loadUrl(
      "http://192.168.0.4:8080/?hostname=192.168.0.4&port=10022&username=cmdclick&password=Y21kY2xpY2s="
    );
    break;
  case "${CTRL_C}": 
    jsSendKey.send("${CTRL_C}");
    break;
  case "${CTRL_Z}": 
    jsSendKey.send("${CTRL_Z}");
    break;
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
    jsSendKey.send("${COPY}");
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
// jsFileSystem.outputSwitch(
// 	""
// )

// // wssh.send('echo aaa');
// setTimeout(
//   function(){
//     wssh.send('echo aaa');
//     // jsUrl.loadUrl(
//     // 	"http://192.168.0.2:8080/?hostname=192.168.0.2&port=10022&username=cmdclick&password=Y21kY2xpY2s=&command=echo aaa"
//     // )
//   },
//   100
// );


function terminalFocus(){
  const terminal = document.querySelector('[aria-label="Terminal input"]');
  if(!terminal) return;
  terminal.focus();
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
