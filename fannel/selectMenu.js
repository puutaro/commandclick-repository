

/// LABELING_SECTION_START
// Display select menu from jsFile @puutaro
// * HIGHLIGHT_SCRIPT
// 	-> trigger when hilight text is
// * EDIT_MENU
// 	-> edit fannel menu
//      DSL button
//          - drag and sort home fannels list
//      ADD button
//          - Add fannel to home fannel list
// --
// --
// bellow setting variable main line up
// * EditExecute is edit mode change
//	- NO is normal edit
//	- ONCE is one time edit and execute
//	- ALWAYD is always edit and execute
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
setReplaceVariables="TEXT_LABEL=label"
setReplaceVariables="FGB_DIR_PATH=dirPath"
setReplaceVariables="FGB_SUFFIX=suffix"
setReplaceVariables="BTN_CMD=cmd"
setReplaceVariables="BTN_LABEL=label"
setReplaceVariables="LIST_PATH=listPath"
setReplaceVariables="LIMIT_NUM=limitNum"
setReplaceVariables="currentAppDirPath=${01}"
setReplaceVariables="selectMenuDirPath=${currentAppDirPath}/${001}"
setReplaceVariables="selectMenuListDirPath=${selectMenuDirPath}/menuList"
setReplaceVariables="selectMenuListFilePath=${selectMenuListDirPath}/menu.txt"
setVariableTypes="EDIT_MENU:LBL:DSL:BTN=${TEXT_LABEL}=THIS|${LIST_PATH}=${selectMenuListFilePath}!${LIMIT_NUM}=20|${BTN_CMD}=jsf '${0}' menuAdd!${BTN_LABEL}=ADD"
setVariableTypes="HIGHLIGHT_SCRIPT:TXT:FGB=${TEXT_LABEL}=THIS|${FGB_DIR_PATH}=${01}!${FGB_SUFFIX}=.js"
hideSettingVariables="editExecute"
hideSettingVariables="setReplaceVariables"
hideSettingVariables="setVariableTypes"
scriptFileName="selectMenu.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
HIGHLIGHT_SCRIPT="highlightSch.js"
EDIT_MENU=""
/// CMD_VARIABLE_SECTION_END



/// Please write bellow with shell script


var loadTimes = 0;
const currentAppDirPath = "${currentAppDirPath}";
const menuAddMode = "menuAdd";
jsFileSystem.createDir(
	"${selectMenuListDirPath}"
);

let args = jsArgs.get().split("\t");
const firstArgs = args.at(0);

switcher();


function switcher(){
	switch(firstArgs){
		case "":
			execLaunchMenuHandler();
			break;
		case menuAddMode:
			execMenuAdd();
			break;
	};
};


function execLaunchMenuHandler() {
	const highlightText = getSelectionText();
	const highLightScriptPath = `${01}/${HIGHLIGHT_SCRIPT}`;
	const isHighlightScript = jsFileSystem.isFile(
		highLightScriptPath
	);
	if(
		highlightText 
		&& isHighlightScript
	){
		launchJsFile(
			highLightScriptPath
		);
		exitZero();
	};
	launchMenu();
	exitZero();
 };

function execMenuAdd(){
	let listCon = jsFileSystem.showFileList(
		"${currentAppDirPath}"
	).split("\t").filter(function(name){
		return name.endsWith(".js")
			|| name.endsWith(".sh")
			|| name.endsWith(".html");
	}).map(function(name){
		return `${currentAppDirPath}/${name}`;
	}).join("\t");
	const selectedFannel = jsDialog.gridDialog(
		"Select bellow fannel",
		"",
		listCon
	).replace(
		"${currentAppDirPath}/",
		""
	);
	if(!selectedFannel) return;
	const currentListCon = jsFileSystem.readLocalFile(
		"${selectMenuListFilePath}"
	);
	jsFileSystem.writeLocalFile(
		"${selectMenuListFilePath}",
		`${selectedFannel}\n${currentListCon}`,
	);
};



function launchMenu(){
	const title="select from bellow";
	let menuTabsepaStringList = jsFileSystem.readLocalFile(
		"${selectMenuListFilePath}"
	).split("\n");
	const menuTabsepaStringListLength = 
		menuTabsepaStringList.length;
	if(!menuTabsepaStringList) exitZero();
	var selectedMenu = "";
	if(menuTabsepaStringListLength == 1){
		selectedMenu = menuTabsepaStringList.at(0);
	} else {
		const menuTabsepaString = 
			menuTabsepaStringList.join("\t");
		selectedMenu = jsDialog.listDialog(
			title,
			"",
			menuTabsepaString
		);
	};
	if(!selectedMenu) exitZero();
	const selectedJsPath = 
		[currentAppDirPath, selectedMenu].join("/");
	launchJsFile(
		selectedJsPath,
	);
};

function launchJsFile(
	selectedJsPath
){
	const jsUrlString = jsUrl.makeJsUrl(
		selectedJsPath
	);
	jsUrl.loadUrl(jsUrlString);	
};


// no use
function launchWhenEditExecute(
	selectedJsPath
){
	const jsFannelContents = jsFileSystem.readLocalFile(
			selectedJsPath
	);
	const settingVariables = jsScript.subSettingVars(
		jsFannelContents
	);
	const editExecuteValue = jsScript.subValOnlyValue(
		"editExecute",
		settingVariables
	);
	if(
		editExecuteValue != "ALWAYS"
	) return;
	const jsFileName = selectedJsPath.split("/").at(-1);
	jsIntent.launchShortcut(
        "${01}",
        jsFileName
    );
};

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    };
    return text;
};

