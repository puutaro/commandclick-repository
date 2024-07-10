
// basic variable
TXT_LABEL=label,
BTN_CMD=cmd,
BTN_LABEL=label,
BTN_TEXT_SIZE=textSize,
BTN_BORDER=onBorder,
TUBE_PREFIX="tube",
TXT_SUFFIX=".txt",
TSV_SUFFIX=".tsv",

// state
TABLE="table",
SEARCHER="searcher",
MANAGER="manager",
CONFIG="config",

// list index setting
listDirKey= "listDir",

// css
lineHeight=60,
textSize=30,

// setting
CHANNEL_NUM=21,
URL_HISTORY_CLICK_MODE="urlHistoryClick",

// dir path
currentAppDirPath=
	"${01}",
cmdYoutuberDirPath=
	`${currentAppDirPath}/${001}`,
cmdYoutuberActionsDirPath=
	`${cmdYoutuberDirPath}/actions`,
cmdYoutuberSettingVariablesDirPath=
	`${cmdYoutuberDirPath}/settingVariables`,
cmdYoutuberSettingsDirPath=
	`${cmdYoutuberDirPath}/settings`,
cmdYoutuberTempDirPath=
	`${cmdYoutuberDirPath}/temp`,
cmdYoutuberPlayListTableDirPath=
	`${cmdYoutuberDirPath}/playListTable`,

// tsv path
cmdYoutuberPlayListName=
	`tubePlayList.tsv`,
cmdYoutuberPlayListPath=
	`${cmdYoutuberPlayListTableDirPath}/${cmdYoutuberPlayListName}`,
cmdYoutuberWebSearchPlayListName=
	`tubeWebSearchPlayList.tsv`,
cmdYoutuberWebSearchPlayListPath=
	`${cmdYoutuberPlayListTableDirPath}/${cmdYoutuberWebSearchPlayListName}`,
cmdYoutuberPreviousMusicPlayListName=
	"tubePreviousPlayList.tsv",
cmdYoutuberPreviousMusicPlayListPath=
	`${cmdYoutuberPlayListTableDirPath}/${cmdYoutuberPreviousMusicPlayListName}`,
cmdYoutuberLikeMusicPlayListName=
	"tubeLikePlayList.tsv",
cmdYoutuberLikeMusicPlayListPath=
	`${cmdYoutuberPlayListTableDirPath}/${cmdYoutuberLikeMusicPlayListName}`,
cmdYoutuberTempPlayListPath=
	`${cmdYoutuberTempDirPath}/tempPlay.tsv`,
cmdYoutuberInstallStampFilePath=
	`${cmdYoutuberTempDirPath}/installStamp.txt`,


// js path
FANNEL_PATH=${0},

// common setting
cmdYoutuberSettingButtonConfigPath=
	`${cmdYoutuberSettingsDirPath}/settingButtonConfig.js`,
cmdYoutuberSettingMenuConfigPath=
	`${cmdYoutuberSettingsDirPath}/settingMenuConfig.js`,
cmdYoutuberSettingLongClickMenuConfigPath=
	`${cmdYoutuberSettingsDirPath}/settingLongClickMenuConfig.js`,

// js action
cmdYoutuberChangeStateAction=
	`${cmdYoutuberActionsDirPath}/changeStateAction.js`,
cmdYoutuberMusicAction=
	`${cmdYoutuberActionsDirPath}/musicAction.js`,
cmdYoutuberNormalPlayAction=
	`${cmdYoutuberActionsDirPath}/normalPlay.js`,
cmdYoutuberCopyToOtherAction=
	`${cmdYoutuberActionsDirPath}/copyToOther.js`,
cmdYoutuberLongPressAction=
	`${cmdYoutuberActionsDirPath}/longPress.js`,
cmdYoutuberInitActionsPath=
	`${cmdYoutuberActionsDirPath}/initAction.js`,
cmdYoutuberInstallActionsPath=
	`${cmdYoutuberActionsDirPath}/installAction.js`,

// list path
cmdYoutuberPlayInfoPath=
	`${cmdYoutuberTempDirPath}/playInfo.tsv`,
cmdYoutuberTempFilePath=
	`${cmdYoutuberTempDirPath}/tempPlay.tsv`,

configHidValPath=
	`${cmdYoutuberSettingVariablesDirPath}/hideConfigVal.js`,

// ubuntu path
settingimport=
	`${cmdYoutuberSettingVariablesDirPath}/ubuntuRepVars.js`,

// table state
settingimport=
	`${cmdYoutuberSettingVariablesDirPath}/tableRepVars.js`,

// manager state path
settingimport=
	`${cmdYoutuberSettingVariablesDirPath}/managerRepVars.js`,

settingimport=
	`${cmdYoutuberSettingVariablesDirPath}/searcherRepVars.js`,


// config state
settingimport=
	`${cmdYoutuberSettingVariablesDirPath}/configRepVars.js`,
