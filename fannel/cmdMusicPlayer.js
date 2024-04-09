

/// LABELING_SECTION_START
// https://github.com/puutaro/cmdMusicPlayer
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
terminalOutputMode="NORMAL"
onUpdateLastModify="ON"
onUrlHistoryRegister="OFF"
onAdBlock="OFF"
terminalFontZoom="0"
terminalColor=""
terminalFontColor=""
setReplaceVariables="file://"
setVariableTypes="file://"
hideSettingVariables="file://"
scriptFileName="cmdMusicPlayer.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
musicDir=""
musicPlayListName="musicPlayList.tsv"
musicPlay="ordinaly"
PLAY="musicPlay"
numberPlay="1"
STOP=""
startNum="0"
endNum="0"
EDIT_MUSIC_PLAY_LIST=""
onResumePlay="ON"
Install="install"
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript


let args = jsArgs.get().split("\t");
var FIRST_ARGS = args.at(0);
const tsvExtend = ".tsv";
if(FIRST_ARGS == PLAY){
	FIRST_ARGS = musicPlay;
};
const FANNEL_SCRIPT_PATH = "${01}/${02}";
const cmdMusicPlayerDirPath = "${cmdMusicPlayerDirPath}";
const cmdMusicPlayerEditDirPath = "${cmdMusicPlayerEditDirPath}";
jsFileSystem.createDir(cmdMusicPlayerEditDirPath);
const cmdMusicPlayerListDirPath = "${cmdMusicPlayerListDirPath}";
initNumVariable();
jsFileSystem.createDir(cmdMusicPlayerListDirPath);
const cmdMusicPlayerDirListFilePath = "${cmdMusicPlayerDirListFilePath}";
const EXEC_SHELL_PATH = `${cmdMusicPlayerDirPath}/cmdMusicPlayer.sh`;
const PLAY_PROCESS_DIR_PATH = `${cmdMusicPlayerDirPath}/process`;
const MUSIC_HISTORY_PATH = `${PLAY_PROCESS_DIR_PATH}/musicHistory.txt`;
const defaultMusicPlayListTsvName = "musicPlayList.tsv";
const MUSIC_PREFIX = "music";
const EDIT_FILE_PATH = makeCreatorJSPath(musicPlayListName);
const INSTALL_MODE = "install";
const SHUFFLE_MODE = "shuffle";
const ORDINALY_MODE = "ordinaly";
const REVERSE_MODE = "reverse";
const NUMBER_MODE = "number";
const STOP_MODE = "stop";
const EDIT_MUSIC_PLAY_LIST_MODE = "EDIT_MUSIC_PLAY_LIST";


if(FIRST_ARGS){
	jsFileSystem.fileEcho(
		scriptFileName,
		terminalOutputMode,
	);
};

switchByArgs();


function switchByArgs(){
	updateByVariableWhenDiff(
		"musicPlayListName",
		EDIT_FILE_PATH.split("/").at(-1),
		musicPlayListName,
	);
	jsListSelect.updateListFileCon(
		cmdMusicPlayerDirListFilePath,
		`${musicDir}`
	);
	switch(FIRST_ARGS){
		case "":
			initFileList();
			let extraMapStr = [
				`on_click_sort=false`,
				'on_sortable_js=false',
				`on_click_url=false`,
				`on_dialog=false`
			].join("|");
			jsIntent.launchEditSite(
				EDIT_FILE_PATH,
				extraMapStr,
				"true",
			);
			break;
		case INSTALL_MODE:
			jsCmdIntent.run_S(
				"bash \"" + EXEC_SHELL_PATH + 
				"\" \""  + INSTALL_MODE + "\""
			);
			break;
		case STOP_MODE:
			execStop();
			break;
		case SHUFFLE_MODE:
			initFileList();
			jsCmdIntent.run_S(
				"bash \"" + EXEC_SHELL_PATH + 
				"\" \"" + SHUFFLE_MODE + "\"" +
				" \"" + EDIT_FILE_PATH + "\"" + 
				" \"" + musicDir + "\""
			);
			break;
		case ORDINALY_MODE:
		case REVERSE_MODE:
			initFileList();
			jsCmdIntent.run_S(
				"bash \"" + EXEC_SHELL_PATH + 
				"\" \"" + ORDINALY_MODE + "\"" + 
				" \"" + EDIT_FILE_PATH + "\"" + 
				" \"" + musicDir + "\""
			);
			break;
		case NUMBER_MODE:
			initFileList();
			jsCmdIntent.run_S(
				"bash \"" + EXEC_SHELL_PATH + 
				"\" \"" + NUMBER_MODE + "\"" + 
				" \"" + EDIT_FILE_PATH + "\"" + 
				" \"" + musicDir + "\"" + 
				" \"" + numberPlay + "\""
			);
			break;
		case EDIT_MUSIC_PLAY_LIST_MODE:
			jsFileSelect.execEditTargetFileName(
		        "musicPlayListName",
				"renameMusicPlayListName",
				cmdMusicPlayerEditDirPath,
				`musicPlayListName:TXT:FSB=${FCB_DIR_PATH}=${cmdMusicPlayerEditDirPath}?${FCB_PREFIX}=${MUSIC_PREFIX}?${FCB_SUFFIX}=${tsvExtend}`,
				`musicPlayListName=${musicPlayListName}\nrenameMusicPlayListName=`,
				MUSIC_PREFIX,
				tsvExtend,
		        "${01}/${02}",
		        "Edit musicPlayListName"
		    );
			break;
	};
};

function makeCreatorJSPath(
	musicPlayListNameSrc
){
	if(!musicPlayListNameSrc){
		musicPlayListNameSrc = defaultMusicPlayListTsvName;
	};
	musicPlayListNameSrc = jsPath.compPrefix(
		musicPlayListNameSrc,
		MUSIC_PREFIX
	);
	musicPlayListName = jsPath.compExtend(
		musicPlayListNameSrc,
		tsvExtend
	);
	return [cmdMusicPlayerEditDirPath, musicPlayListName].join('/');
};

function initFileList(){
	let fileList = jsFileSystem.showFileList(
		musicDir
	).split("\t").map(function(file){
		const title = file.split('/').at(-1);
		return `${title}\t${musicDir}/${file}`;
	}).sort();
	if(musicPlay == REVERSE_MODE){
		fileList = fileList.reverse();
	};

	const fileListLimitNum = fileList.length - 1;
	fileList = sortByLastMusic(fileList);

	if(startNum != 0) startNum--;
	if(
		startNum > fileListLimitNum
	) startNum = fileListLimitNum;

	if(endNum == 0) endNum = fileListLimitNum;
	else endNum--;
	if(
		endNum > fileListLimitNum
	) endNum = fileListLimitNum;
	if(startNum > endNum) {
		jsFileSystem.writeLocalFile(
			EDIT_FILE_PATH,
			[""].join("\n")
		);
		return;
	};
	let filterFileList = fileList.filter(
		function(file, index){
			return startNum <= index 
						&& index <= endNum;
		}
	);
	jsFileSystem.writeLocalFile(
		EDIT_FILE_PATH,
		filterFileList.join("\n")
	);
};

function sortByLastMusic(fileList){
	if(
		onResumePlay === "OFF"
	) return fileList;
	jsFileSystem.createDir(
		PLAY_PROCESS_DIR_PATH
	);
	const grepPrefix = "Playing: ";
	const removePrefixRegex = new RegExp(`^${grepPrefix}`, ''); 
	let lastMusic = jsFileSystem.readLocalFile(
		MUSIC_HISTORY_PATH
	).split("\n").filter(function(line){
		return line.includes(musicDir) 
			&& line.startsWith(grepPrefix);
	}).map(function(line){
		return line.replace(removePrefixRegex, '');
	}).at(-1);
	if(!lastMusic){
		return fileList
	}
	const lastMusicIndex = fileList.findIndex(function(element){
		return element.includes(lastMusic);
	});
	let fileListBeforeLastMusicIndex = fileList.slice(0, lastMusicIndex);
	let fileListAfterLastMusicIndex = fileList.slice(lastMusicIndex);
	return fileListAfterLastMusicIndex.concat(fileListBeforeLastMusicIndex);
};

function updateByVariableWhenDiff(
	tergetVariableName,
	currentVariableValue,
	pastVariableValue,
){
	if(
		currentVariableValue == pastVariableValue
	) return;
	
	jsEdit.updateByVariable(
		FANNEL_SCRIPT_PATH,
        tergetVariableName,
        currentVariableValue
	);
};

function initNumVariable(){
	const initPrefix = "init";
	let initList = [
		`${initPrefix}StartNum`,
		`${initPrefix}EndNum`,
	];
	const initIndex = initList.indexOf(FIRST_ARGS);
	if(initIndex < 0) return;
	const initPrefixRegex = new RegExp(`^${initPrefix}`);
	const updateVariableName = 
		initList[initIndex].replace(initPrefixRegex, '');
	jsEdit.updateByVariable(
		FANNEL_SCRIPT_PATH,
        capitalize(updateVariableName),
        "0"
    );
	exitZero();
};

function capitalize(str) {
	if (
		typeof str !== 'string' 
		|| !str
	) return str;
	return str.charAt(0).toLowerCase() 
		+ str.slice(1);
};

function execStop(){
	jsCmdIntent.run_S(
		"bash \"" + EXEC_SHELL_PATH + 
		"\" \"" + STOP_MODE + "\""
	);
};
