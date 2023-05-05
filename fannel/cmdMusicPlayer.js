

/// LABELING_SECTION_START
// Music player @puutaro
//	* install 
// 		-> install require package
//	* play 
// 		-> music play list site
//	* musicDir 
// 		-> Target music file saved directory path
// 	* musicPlayListName 
//		-> Input or select play list file name
//		- Prefix must be "music" ex) "musicPlayList"
// 	* musicPlay 
//		-> Select shuffle or ordinaly and press
//		- Press "Exec" and execute play list
// 	* numberPlay 
//		-> Input or inc/dec number
//		- Press "Exec" and play number
//	* Volume control enable when CommandClick hide
// 	* STOP
//		-> Play stop (recommend: notification bar swip out)
// 	* startNum 
//		-> Start number, 0: firstNumber
// 	* endNum
//		-> End number, 0: lastNumber
// --
// --
// Bellow setting variable main line up
// * terminalSizeType is cmdclick terminal size option
//  - OFF: no adjust (default)
//  - LONG: LongSize
//  - SHORT: ShortSize
// * terminalOutputMode decide output mode in cmdclick terminal
//  - NORMAL: normal terminal output (default)
//  - REFLASH: Before terminal output, screen resflesh
//  - REFLASH_AND_FIRST_ROW: Before terminal output, screen resflesh and focus first row
//  - DEBUG: stdr + stderr
//  - NO: no output (bacground exec)
// * onUpdateLastModify is how updating file last modified status when executing
//  - ON: update this (default)
//  - OFF: no update this
// * onAdBlock: adblock switch
//  - INHERIT: inherit config setting
//  - ON: on
//  - OFF: off
// * terminalFontZoom adjust terminal font size (percentage)
// * terminalFontColor adjust terminal font color
// * terminalColor adjust terminal background color
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
terminalOutputMode="NORMAL"
onUpdateLastModify="ON"
onUrlHistoryRegister="OFF"
terminalFontZoom="0"
terminalColor=""
terminalFontColor=""
setReplaceVariable="cmdMusicPlayerDirPath=${01}/${001}"
setReplaceVariable="cmdMusicPlayerEditDirPath=${cmdMusicPlayerDirPath}/edit"
setReplaceVariable="cmdMusicPlayerListDirPath=${cmdMusicPlayerDirPath}/list"
setReplaceVariable="cmdMusicPlayerDirListFilePath=${cmdMusicPlayerListDirPath}/music_dir_list"
setVariableType="musicDir:ELCBDIR=${cmdMusicPlayerDirListFilePath}!10"
setVariableType="musicPlayListName:EFCB=${cmdMusicPlayerEditDirPath}!music!.tsv"
setVariableType="musicPlay:CB=ordinaly!shuffle!reverse"
setVariableType="PLAY:BTN=::TermOut::jsf '${0}'"
setVariableType="numberPlay:NUMB=!1..1000!1|::TermOut::jsf '${0}' number!Play"
setVariableType="startNum:NUMB=!0..10000!1|jsf '${0}' initStartNum!to0"
setVariableType="endNum:NUMB=!0..10000!1|jsf '${0}' initEndNum!to0"
setVariableType="STOP:BTN=pkill -9 mpv"
setVariableType="Install:BTN=jsf '${0}'"
setVariableType="EDIT_MUSIC_PLAY_LIST:BTN=jsf '${0}' EDIT_MUSIC_PLAY_LIST"
setVariableType="onResumePlay:CB=ON!OFF"
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
const cmdMusicPlayerListDirPath = "${cmdMusicPlayerListDirPath}";
initNumVariable();
jsFileSystem.createDir(cmdMusicPlayerListDirPath);
const cmdMusicPlayerDirListFilePath = "${cmdMusicPlayerDirListFilePath}";
const EXEC_SHELL_PATH = `${cmdMusicPlayerDirPath}/cmdMusicPlayer.sh`;
const PLAY_PROCESS_DIR_PATH = `${cmdMusicPlayerDirPath}/process`;
const MUSIC_HISTORY_PATH = `${PLAY_PROCESS_DIR_PATH}/musicHistory.txt`;
const MUSIC_PREFIX = "music";
const EDIT_FILE_PATH = makeCreatorJSPath(musicPlayListName);
const INSTALL_MODE = "install";
const SHUFFLE_MODE = "shuffle";
const ORDINALY_MODE = "ordinaly";
const REVERSE_MODE = "reverse";
const NUMBER_MODE = "number";
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
			jsIntent.launchEditSite(
				EDIT_FILE_PATH,
				"",
				"false",
				"false",
				"false",
				"true"
			);
			break;
		case INSTALL_MODE:
			cmdIntent.run(
				"bash \"" + EXEC_SHELL_PATH + 
				"\" \""  + INSTALL_MODE + "\""
			);
			break;
		case SHUFFLE_MODE:
			initFileList();
			cmdIntent.run(
				"bash \"" + EXEC_SHELL_PATH + 
				"\" \"" + SHUFFLE_MODE + "\"" +
				" \"" + EDIT_FILE_PATH + "\"" + 
				" \"" + musicDir + "\""
			);
			break;
		case ORDINALY_MODE:
		case REVERSE_MODE:
			initFileList();
			cmdIntent.run(
				"bash \"" + EXEC_SHELL_PATH + 
				"\" \"" + ORDINALY_MODE + "\"" + 
				" \"" + EDIT_FILE_PATH + "\"" + 
				" \"" + musicDir + "\""
			);
			break;
		case NUMBER_MODE:
			initFileList();
			cmdIntent.run(
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
				`musicPlayListName:EFCB=${cmdMusicPlayerEditDirPath}!${MUSIC_PREFIX}!${tsvExtend}`,
				`musicPlayListName=${musicPlayListName}\trenameMusicPlayListName=`,
				MUSIC_PREFIX,
				tsvExtend,
		        "${01}/${02}",
		        "Edit musicPlayListName"
		    );
			break;
	};
};

function makeCreatorJSPath(
	musicPlayListName
){
	if(!musicPlayListName){
		alert("musicPlayListName must be written");
		throw new Error('exit');
		exitZero();
	};
	musicPlayListName = jsPath.compPrefix(
		musicPlayListName,
		MUSIC_PREFIX
	);
	musicPlayListName = jsPath.compExtend(
		musicPlayListName,
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
