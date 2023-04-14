

/// LABELING_SECTION_START
// GPT3.5 free client @puutaro
// * TXT_TO_CLIP -> copy text to clipboard and launch gpt35 site
// * REMOVE_TEXT -> remove request from list
// bellow setting variable main line up
// * EditExecute is edit mode change
//	- NO is normal edit
//	- ONCE is one time edit and execute
//	- ALWAYD is always edit and execute
// * terminalSizeType is cmdclick terminal size option
//  - OFF: no adjust (default)
//  - LONG: LongSize
//  - SHORT: ShortSize
// * terminalFontZoom adjust terminal font size (percentage)
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
onUrlHistoryRegister="OFF"
terminalFontZoom="130"
setVariableType="LAUNCH_GPT35:RO="
setVariableType="TXT_TO_CLIP:LCBB=${01}/cmdGpt35Dir/reqList|::TermLong::jsf '${0}' clip"
setVariableType="REMOVE_TEXT:LCBB=${01}/cmdGpt35Dir/reqList|jsf '${0}' remove"
scriptFileName="cmdGpt35.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
LAUNCH_GPT35="https://huggingface.co/spaces/kunishou/Rapid-GPT"
TXT_TO_CLIP=""
REMOVE_TEXT=""
/// CMD_VARIABLE_SECTION_END



/// Please write bellow with shell script


let args = jsArgs.get().split("\t");
const firstArgs = args.at(0);
const REQ_LIST_DIR_PATH = "${01}/cmdGpt35Dir";
const REQ_LIST_FILE_PATH = `${REQ_LIST_DIR_PATH}/reqList`;
const launchGpt35Arg = "";
const clipArg = "clip";
const removeArg = "remove";
const escapeCharHyphen = "-";


switch(firstArgs){
	case launchGpt35Arg:
		execLaunchGpt35();
		break;
	case clipArg:
		clipText(TXT_TO_CLIP);
		break;
	case removeArg:
		removeFromList(REMOVE_TEXT);
		break;
};


function execLaunchGpt35(){
	jsUrl.loadUrl(LAUNCH_GPT35);
};


function clipText(text){
	const clipText = text.trim();
	jsUtil.copyToClipboard(clipText, 10);
	jsToast.short("copy ok");
	updateListFileCon(clipText);
	execLaunchGpt35();
};

function updateListFileCon(clipText){
	jsFileSystem.createDir(
		REQ_LIST_DIR_PATH
	);
	let currentListCons = jsFileSystem.readLocalFile(
			REQ_LIST_FILE_PATH
		).split("\n");
	if(
		clipText === escapeCharHyphen
	) return;
	const inInclude = currentListCons.find(
		function(req){
			return req.trim() === clipText;
		}
	);
	if(inInclude) return;
	const updateListConSource = clipText + 
		"\n" + 
		jsFileSystem.readLocalFile(
			REQ_LIST_FILE_PATH
		);
	const updateListCon = updateListConSource
		.split("\n")
		.filter(
			function(req){
				const trimReq = req.trim();
				return trimReq !== "" 
					&& trimReq !== escapeCharHyphen;
			}
		).join("\n");
	jsFileSystem.writeLocalFile(
        REQ_LIST_FILE_PATH,
        updateListCon
	);
};

function removeFromList(reqText){
	jsFileSystem.createDir(
		REQ_LIST_DIR_PATH
	);
	let currentListCons = jsFileSystem.readLocalFile(
			REQ_LIST_FILE_PATH
		).split("\n");
	const trimRequest = reqText.trim();
	if(
		trimRequest == escapeCharHyphen
	) return;
	const inInclude = currentListCons.find(
		function(req){
			return req.trim() === trimRequest;
		}
	);
	if(!inInclude) return;
	const updateListCon = jsFileSystem.readLocalFile(
		REQ_LIST_FILE_PATH
	)
		.split("\n")
		.filter(
			function(req){
				const trimReq = req.trim();
				return trimReq !== "" 
					&& trimReq !== escapeCharHyphen
					&& trimReq !== trimRequest;
			}
		).join("\n");
	jsFileSystem.writeLocalFile(
        REQ_LIST_FILE_PATH,
        updateListCon
	);
	jsIntent.launchShortcut(
        "${01}",
        "${02}"
    );
};
