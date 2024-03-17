
// basic variable
TXT_LABEL=label,
BTN_CMD=cmd,
BTN_LABEL=label,
BTN_TEXT_SIZE=textSize,
ALTER=alter,
BTN_BORDER=onBorder,
TTS_PREFIX="tts",
TXT_SUFFIX=".txt",
TSV_SUFFIX=".tsv",

// state
TABLE=table,
MANAGER=manager,
CONFIG=config,

// list index setting
listDirKey=listDir,

// css
lineHeight=60,
textSize=30,


// dir path variable
currentAppDirPath=
	`${01}`,
ttsPlayerDirPath=
	"${01}/${001}",
cmdTtsPlayerActionsDirPath=
	`${ttsPlayerDirPath}/actions`,
cmdTtsPlayerSettingVariablesDirPath=
	`${ttsPlayerDirPath}/settingVariables`,
cmdTtsPlayerSettingsDirPath=
	`${ttsPlayerDirPath}/settings`,
cmdTtsPlayerTempDirPath=
	"${ttsPlayerDirPath}/temp",
cmdTtsPlayerPlayListTableDirPath=
	`${ttsPlayerDirPath}/playListTable`,
cmdTtsPlayerSaveDirPath=
	"${ttsPlayerDirPath}/save",
cmdTtsPlayerSaveUrlConDirPath=
	`${cmdTtsPlayerSaveDirPath}/urlCon`,
cmdTtsPlayerShellDirPath=
	`${ttsPlayerDirPath}/shell`,

// play list
cmdTtsPlayerPlayListName=
	`ttsPlayList.tsv`,
cmdTtsPlayerPlayListPath=
	`${cmdTtsPlayerPlayListTableDirPath}/${cmdTtsPlayerPlayListName}`,
cmdTtsPlayerPreviousTtsPlayListName=
	"ttsPreviousPlayList.tsv",
cmdTtsPlayerPreviousTtsPlayListPath=
	`${cmdTtsPlayerPlayListTableDirPath}/${cmdTtsPlayerPreviousTtsPlayListName}`,

// js path
FANNEL_PATH=${0},

// js action
cmdTtsPlayerChangeStateAction=
	`${cmdTtsPlayerActionsDirPath}/changeStateAction.js`,
cmdTtsPlayerTtsAction=
	`${cmdTtsPlayerActionsDirPath}/ttsAction.js`,

// list path
cmdTtsPlayerPlayInfoPath=
	"${cmdTtsPlayerTempDirPath}/playInto.tsv",
cmdTtsPlayerTempFilePath=
	"${cmdTtsPlayerTempDirPath}/tempPlay.tsv",

// shell
makeHeaderTitleShell=
	`${cmdTtsPlayerShellDirPath}/make_header_title.sh`,

configHidValPath=
	`${cmdTtsPlayerSettingVariablesDirPath}/hideConfigVal.js`,

/// table state
settingimport=
	`${cmdTtsPlayerSettingVariablesDirPath}/tableRepVars.js`,

// manager state path
settingimport=
	`${cmdTtsPlayerSettingVariablesDirPath}/managerRepVars.js`,

/// config state
settingimport=
	`${cmdTtsPlayerSettingVariablesDirPath}/configRepVars.js`,