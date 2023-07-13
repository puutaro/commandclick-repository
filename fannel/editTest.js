

/// LABELING_SECTION_START
// Create clipboard format by drag & drop @puutaro
// * creatorJSName
// 		-> you wont to create jsFileName
// --
// --
// bellow setting variable main line up
// * terminalOutputMode decide output mode in cmdclick terminal
//  - NORMAL: normal terminal output (default)
//  - REFLASH: Before terminal output, screen resflesh
//  - REFLASH_AND_FIRST_ROW: Before terminal output, screen resflesh and focus first row
//  - DEBUG: stdr + stderr
//  - NO: no output (bacground exec)
// * onUrlHistoryRegister is url history update signal
//  - ON: update
//  - OFF: no update
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalOutputMode="NORMAL"
onUrlHistoryRegister="OFF"
setReplaceVariables="BTN_CMD=cmd"
setReplaceVariables="BTN_LABEL=label"
setReplaceVariables="FCB_PREFIX=prefix"
setReplaceVariables="FCB_SUFFIX=suffix"
setReplaceVariables="LIST_PATH=listPath"
setReplaceVariables="LIMIT_NUM=limitNum"
setReplaceVariables="editTestDirPath=${01}/${001}"
setReplaceVariables="editTestListDirPath=${editTestDirPath}/list"
setReplaceVariables="editTestList1FilePath=${editTestListDirPath}/list1.txt"
setVariableTypes="editTestVal1:TXT:CB:BTN=aa!bb!cc|cmd=jsf '${0}' editTestVal1"
setVariableTypes="editTestValNoText:CB:BTN=aa!bb!cc|cmd=jsf '${0}' editTestValNoText"
setVariableTypes="editTestEditListCb:HL:RO:TXT:ELSB:BTN:BTN=${LIST_PATH}=${editTestList1FilePath}!${LIMIT_NUM}=10|${BTN_CMD}=jsf '${0}' editTestEditListCb!${BTN_LABEL}=exc1|${BTN_CMD}=jsf '${0}' editTestEditListCb!${BTN_LABEL}=exc2"
setVariableTypes="editTestEditListdssb:DSSB="
scriptFileName="editTest.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
plainText="aa"
editTestVal1=""
editTestValNoText=""
editTestEditListCb=""
editTestEditListdssb=""
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with shell script


let args = jsArgs.get().split("\t");
const firstArgs = args.at(0);
const currentAppDirPath = "${01}";
const clipFileName = "${02}".replace(/\.js$/, "");


switch(firstArgs){
	case "":
		alert("editTestVal1");
		break;
	case "editTestVal1":
		alert(`editTestVal1: ${editTestVal1}`);
		break;
	case "editTestValNoText":
		alert(`editTestValNoText: ${editTestValNoText}`);
		break;
	case "editTestEditListCb":
		alert(`editTestEditListCb: ${editTestEditListCb}`);
		break;
};