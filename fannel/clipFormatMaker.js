

/// LABELING_SECTION_START
// https://github.com/puutaro/clipFormatMaker
// 2. Press play button

/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalOutputMode="NORMAL"
onUrlHistoryRegister="OFF"
disableSettingValsEdit="ON"
onAdBlock="OFF"
setReplaceVariables="FCB_PREFIX=prefix"
setReplaceVariables="FCB_SUFFIX=suffix"
setVariableTypes="creatorJSName:TXT:FGB=${FCB_PREFIX}=clip?${FCB_SUFFIX}=.js"
hideSettingVariables="file://"
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
