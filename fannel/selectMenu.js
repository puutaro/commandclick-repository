

/// LABELING_SECTION_START
// display select menu from jsFile @puutaro
/// LABELING_SECTION_END


/// SETTING_SECTION_START
setVariableType="menu1:EFCB="
setVariableType="menu2:EFCB="
setVariableType="menu3:EFCB="
setVariableType="menu4:EFCB="
setVariableType="menu5:EFCB="
setVariableType="menu6:EFCB="
setVariableType="menu7:EFCB="
setVariableType="menu8:EFCB="
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

const jsUrlString = jsUrl.makeJsUrl(selectedJsPath);
jsUrl.loadUrl(jsUrlString);
