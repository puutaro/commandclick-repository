

/// LABELING_SECTION_START
// Display select menu from jsFile @puutaro
// * EDIT_MENU
// 	-> edit fannel menu
//      DSL button
//          - drag and sort home fannels list
//      ADD button
//          - Add fannel to home fannel list
// --
// --
// bellow setting variable main line up
// bellow setting variable main line up
// * EditExecute is edit mode change
//	- NO is normal edit
//	- ONCE is one time edit and execute
//	- ALWAYD is always edit and execute
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
setReplaceVariables="file://${01}/${001}/settingVariables/setReplaceVariables.js"
setVariableTypes="file://${01}/${001}/settingVariables/setVariableTypes.js"
hideSettingVariables="file://${01}/${001}/settingVariables/hideSettingVariables.js"
scriptFileName="selectMenu.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
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
			launchMenu();
			break;
		case menuAddMode:
			execMenuAdd();
			break;
	};
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
	const menuTabsepaString = jsFileSystem.readLocalFile(
		"${selectMenuListFilePath}"
	).split("\n").join("\t");
	const selectedMenu = jsDialog.listDialog(
		title,
		"",
		menuTabsepaString
	);
	const selectedJsPath = [currentAppDirPath, selectedMenu].join("/");
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
