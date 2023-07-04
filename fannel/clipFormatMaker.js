

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
setReplaceVariable="FCB_PREFIX=prefix"
setReplaceVariable="FCB_SUFFIX=suffix"
setVariableType="creatorJSName:EFGB=${FCB_PREFIX}=clip!${FCB_SUFFIX}=.js"
scriptFileName="clipFormatMaker.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
creatorJSName=""
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with shell script


let args = jsArgs.get().split("\t");
const firstArgs = args.at(0);
const currentAppDirPath = "${01}";
const clipFileName = "${02}".replace(/\.js$/, "");
const clipDirName = [clipFileName, "Dir"].join('');
const clipDirPath = [currentAppDirPath, clipDirName].join('/');
const clipHtmlName = [clipFileName, "html"].join('.');
const clipHtmlPath = [clipDirPath, clipHtmlName].join('/');
const clipEditHtmlDirName = "edit";
const clipEditHtmlDirPath = [clipDirPath, clipEditHtmlDirName].join('/');
const clipEditHtmlPath = [clipEditHtmlDirPath, clipHtmlName].join('/');
const CLIP_MAKER_TARGET_JS_PATH = "CLIP_MAKER_TARGET_JS_PATH";

try {
	const creatorJSPath = makeCreatorJSPath(creatorJSName);
	const jsFannelContents = jsFileSystem.readLocalFile(
		clipHtmlPath
	).replace(CLIP_MAKER_TARGET_JS_PATH, creatorJSPath);

	jsFileSystem.createDir(clipEditHtmlDirPath);
	jsFileSystem.writeLocalFile(
		clipEditHtmlPath,
		jsFannelContents
	);
	jsUrl.loadUrl("file://" + clipEditHtmlPath);
} catch (e) {
	console.log(e.message);
};

function makeCreatorJSPath(creatorJSName){
	if(!creatorJSName){
		alert("creatorJSName must be written");
		throw new Error('exit');
	};
	if(creatorJSName == "${02}") {
		alert("${02} cannot edit");
		throw new Error('exit');
	};
	if(!creatorJSName.endsWith(".js")){
		creatorJSName = creatorJSName + ".js";
	};
	const creatorJSPrefix = "clip";
	if(!creatorJSName.startsWith(creatorJSPrefix)){
		creatorJSName = creatorJSPrefix + creatorJSName;
	};
	return [currentAppDirPath, creatorJSName].join('/');
}
