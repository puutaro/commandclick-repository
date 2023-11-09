

/// LABELING_SECTION_START
// Display select menu from jsFile @puutaro

// ## Cmd Variables
// --------
// ### HIGHLIGHT_SCRIPT
// Trigger when hilight text is
// ### EDIT_MENU
// Edit fannel menu

// | Button type | usage | 
// | --------- | --------- |
// | DSL button | Drag and sort home fannels list |
// | ADD button | Add fannel to home fannel list |

// ## Setting variables
// ---------
// ### EditExecute
// Edit mode change

// | edit mode | description |
// | -------- | -------- |
// | `NO` | normal edit |
// | `ONCE` | one time edit and execute |
// | `ALWAYD` | always edit and execute |

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
setReplaceVariables="URL_HISTORY_CLICK=urlHistoryClick"
setReplaceVariables="currentAppDirPath=${01}"
setReplaceVariables="selectMenuDirPath=${currentAppDirPath}/${001}"
setReplaceVariables="selectMenuListDirPath=${selectMenuDirPath}/menuList"
setReplaceVariables="selectMenuListFilePath=${selectMenuListDirPath}/menu.txt"
setVariableTypes="SET_ARGS:CB=-!urlHistoryClick"
setVariableTypes="EDIT_MENU:LBL:DSL:BTN=${TEXT_LABEL}=THIS|${LIST_PATH}=${selectMenuListFilePath}|${BTN_CMD}=setf type=ListAdd suffix=.js dirPath=${01}!${BTN_LABEL}=ADD"
setVariableTypes="HIGHLIGHT_SCRIPT:TXT:FGB=${TEXT_LABEL}=THIS|${FGB_DIR_PATH}=${01}!${FGB_SUFFIX}=.js"
hideSettingVariables="editExecute"
hideSettingVariables="setReplaceVariables"
hideSettingVariables="setVariableTypes"
scriptFileName="selectMenu.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
SET_ARGS=""
HIGHLIGHT_SCRIPT="webSearcher.js"
EDIT_MENU="${01}/${001}/menuList/menu.txt"
/// CMD_VARIABLE_SECTION_END



/// Please write bellow with shell script


var loadTimes = 0;
const currentAppDirPath = "${currentAppDirPath}";
const menuAddMode = "menuAdd";
jsFileSystem.createDir(
	"${selectMenuListDirPath}"
);

let args = jsArgs.get().split("\t");
const FIRST_ARGS = args.at(0);

switcher();


function switcher(){
	switch(FIRST_ARGS){
		case "":
		case "${URL_HISTORY_CLICK}":
			execLaunchMenuHandler();
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
			"Select bellow list",
			"",
			menuTabsepaString
		);
	};
	if(!selectedMenu) exitZero();
	const selectedJsPath = 
		[currentAppDirPath, selectedMenu].join("/");
	launchJsHandler(
		selectedJsPath
	)
};

function launchJsHandler(
	selectedJsPath
){
	jsArgs.set(
		decideSetArgs()
	);
	if(SET_ARGS != "${URL_HISTORY_CLICK}"){
		loadJsPathAsUrl(
			selectedJsPath
		);
	};
	const urlHistoryClickJsPath = [
		jsPath.getFannelDirPath(selectedJsPath),
		"urlHistoryClick.js",
	].join("/");
	if(!jsFileSystem.isFile(urlHistoryClickJsPath)){
		loadJsPathAsUrl(
			selectedJsPath
		);
	};
	loadJsPathAsUrl(
		urlHistoryClickJsPath
	);
};

function loadJsPathAsUrl(
	selectedJsPath
){
	const jsUrlString = jsUrl.makeJsUrl(
			selectedJsPath
		);
	jsUrl.loadUrl(jsUrlString);
	exitZero();
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

function decideSetArgs(){
	switch(SET_ARGS){
		case "${URL_HISTORY_CLICK}":
			return `${SET_ARGS}`;
	};
	return "";
};

