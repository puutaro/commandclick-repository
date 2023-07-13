

/// LABELING_SECTION_START
// clipboad formatter @maker

// launchGmail: Launch url
// copyTxt: Launch url
// --
// --
// bellow setting variable main line up
// * EditExecute is edit mode change
//	- NO is normal edit
//	- ONCE is one time edit and execute
//	- ALWAYS is always edit and execute
// * terminalOutputMode decide output mode in cmdclick terminal
//  - NORMAL: normal terminal output (default)
//  - REFLASH: Before terminal output, screen resflesh
//  - REFLASH_AND_FIRST_ROW: Before terminal output, screen resflesh and focus first row
//  - DEBUG: stdr + stderr
//  - NO: no output (bacground exec)
// * terminalSizeType is cmdclick terminal size option
//  - OFF: no adjust (default)
//  - LONG: LongSize
//  - SHORT: ShortSize
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalOutputMode="NORMAL"
terminalSizeType="LONG"
onUrlHistoryRegister="OFF"
setVariableTypes="to:TXT:ELSB=listPath=/storage/emulated/0/Documents/cmdclick/AppDir/default/clipGmailFormatterDir/list/toList!limitNum=20"
setVariableTypes="firstGreet:TXT:ELSB=listPath=/storage/emulated/0/Documents/cmdclick/AppDir/default/clipGmailFormatterDir/list/firstGreetList!limitNum=20"
setVariableTypes="newline:RO="
setVariableTypes="finishGreet:TXT:ELSB=listPath=/storage/emulated/0/Documents/cmdclick/AppDir/default/clipGmailFormatterDir/list/finishGreetList!limitNum=20"
setVariableTypes="newline:RO="
setVariableTypes="newline:RO="
setVariableTypes="launchGmail:TXT:ELSB:BTN=listPath=/storage/emulated/0/Documents/cmdclick/AppDir/default/clipGmailFormatterDir/list/launchGmailList!limitNum=20|cmd=jsf '${0}' launchGmail"
setVariableTypes="copyTxt:TXT:ELSB:BTN=listPath=/storage/emulated/0/Documents/cmdclick/AppDir/default/clipGmailFormatterDir/list/copyTxtList!limitNum=20|cmd=jsf '${0}' copyTxt"
scriptFileName="clipGmailFormatter.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
to=""
firstGreet=""
nameGreet="北村です。"
// cmdclickNewline
// cmdclickNewline
newline="|n|n"
finishGreet=""
// cmdclickNewline
newline="|n"
finishName="北村"
// cmdclickNewline
newline="|n"
launchGmail=""
copyTxt=""
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with shell script



let args = jsArgs.get().split("\t");
const firstArgs = args.at(0);

let currentFilePathList = "${0}".replace(/^file:\/\//, '').split('/');
const parentDirPath = currentFilePathList.slice(0, currentFilePathList.length - 1).join('/');

const clipMode = "";
const urlLaunchMode = "url";


function execClipMode(){
	var clipBody = "";
	var newlines = "";

	if(to){
		clipBody += newlines + to + "\n";
	} else {
		newlines = "";
	};

	if(firstGreet){
		clipBody += newlines + firstGreet + "\n";
	} else {
		newlines = "";
	};

	if(nameGreet){
		clipBody += newlines + nameGreet + "\n";
	} else {
		newlines = "";
	};

	newlines += "\n";
	newlines += "\n";
	if(finishGreet){
		clipBody += newlines + finishGreet + "\n";
	} else {
		newlines = "";
	};

	newlines += "\n";
	if(finishName){
		clipBody += newlines + finishName + "\n";
	} else {
		newlines = "";
	};

	newlines += "\n";
	jsListSelect.updateListFileCon(
		`/storage/emulated/0/Documents/cmdclick/AppDir/default/clipGmailFormatterDir/list/toList`,
		to
	);

	jsListSelect.updateListFileCon(
		`/storage/emulated/0/Documents/cmdclick/AppDir/default/clipGmailFormatterDir/list/firstGreetList`,
		firstGreet
	);

	jsListSelect.updateListFileCon(
		`/storage/emulated/0/Documents/cmdclick/AppDir/default/clipGmailFormatterDir/list/finishGreetList`,
		finishGreet
	);
	jsUtil.copyToClipboard(clipBody, 10);
	jsToast.short(clipBody);
};

function urlLaunchOrClip(LAUNCH_URL){
	if(
		LAUNCH_URL.startsWith("https://")
		|| LAUNCH_URL.startsWith("http://")
		|| LAUNCH_URL.startsWith("/")
		|| LAUNCH_URL.startsWith("file://")
	){
		jsUrl.loadUrl(LAUNCH_URL);
		return;
	};
	jsUtil.copyToClipboard(LAUNCH_URL, 10);
	jsToast.short("text to clipboard");
};


switch(firstArgs){
	case clipMode:
		execClipMode();
		break;
	case "launchGmail":
		jsListSelect.updateListFileCon(
		`/storage/emulated/0/Documents/cmdclick/AppDir/default/clipGmailFormatterDir/list/launchGmailList`,
			launchGmail
		);
		urlLaunchOrClip(launchGmail);
		break;
	case "copyTxt":
		jsListSelect.updateListFileCon(
		`/storage/emulated/0/Documents/cmdclick/AppDir/default/clipGmailFormatterDir/list/copyTxtList`,
			copyTxt
		);
		urlLaunchOrClip(copyTxt);
		break;
};