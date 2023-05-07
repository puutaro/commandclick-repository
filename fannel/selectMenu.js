

/// LABELING_SECTION_START
// Display select menu from jsFile @puutaro
/// LABELING_SECTION_END


/// SETTING_SECTION_START
setVariableType="title:RO="
setReplaceVariable="FCB_SUFFIX=suffix"
setVariableType="menu1:EFCB=${FCB_SUFFIX}=.html&.js"
setVariableType="menu2:EFCB=${FCB_SUFFIX}=.html&.js"
setVariableType="menu3:EFCB=${FCB_SUFFIX}=.html&.js"
setVariableType="menu4:EFCB=${FCB_SUFFIX}=.html&.js"
setVariableType="menu5:EFCB=${FCB_SUFFIX}=.html&.js"
setVariableType="menu6:EFCB=${FCB_SUFFIX}=.html&.js"
setVariableType="menu7:EFCB=${FCB_SUFFIX}=.html&.js"
setVariableType="menu8:EFCB=${FCB_SUFFIX}=.html&.js"
scriptFileName="selectMenu.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
title="select from bellow"
menu1=""
menu2=""
menu3=""
menu4=""
menu5=""
menu6=""
menu7=""
menu8=""
/// CMD_VARIABLE_SECTION_END



/// Please write bellow with shell script


var loadTimes = 0;
let currentFilePathList = "${0}"
		.replace(/^file:\/\//, '')
		.split('/');

const parentDirPath = currentFilePathList
		.slice(0, currentFilePathList.length - 1)
		.join('/');


const menuPlusString =  [...Array(8).keys()].map(function( value ) {
	const suffix = value + 1;
    return "menu" + suffix;
}).join(" + '\t' + ");

const menuTabsepaStirngSource = eval(
		menuPlusString
	)
	.replaceAll(/\t\t*/g, "\t")
	.trim()
	.split("\t");

const menuTabsepaStirng = Array.from(
	new Set(
		menuTabsepaStirngSource
	)
).join("\t");

const selectedMenu = jsDialog.listDialog(
	title,
	"",
	menuTabsepaStirng
);

const selectedJsPath = [parentDirPath, selectedMenu].join("/");

launchJsFile(
	selectedJsPath,
);


function launchJsFile(
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
	if(editExecuteValue == "ALWAYS"){
		const jsFileName = selectedJsPath.split("/").at(-1);
		jsIntent.launchShortcut(
	        "${01}",
	        jsFileName
	    );
	    return;
	};
	const jsUrlString = jsUrl.makeJsUrl(
		selectedJsPath
	);
	jsUrl.loadUrl(jsUrlString);	
};
