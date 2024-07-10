
// basic variable
TXT_LABEL=label,
BTN_CMD=cmd,
BTN_LABEL=label,
BTN_TEXT_SIZE=textSize,
BTN_BORDER=onBorder,
MUSIC_PREFIX="music",
TXT_SUFFIX=".txt",
TSV_SUFFIX=".tsv",
M4A_SUFFIX=".m4a",
MP3_SUFFIX=".mp3",

// state
TABLE="table",
MANAGER="manager",
CONFIG="config",

// list index setting
listDirKey= "listDir",

// css
lineHeight=60,
textSize=30,

// setting
CHANNEL_NUM=21,
MPV_SOCKET="/tmp/mpv_socket",
URL_HISTORY_CLICK_MODE="urlHistoryClick",

// dir path
currentAppDirPath=
	"${01}",
cmdMusicPlayerDirPath=
	`${currentAppDirPath}/${001}`,
cmdMusicPlayerActionsDirPath=
	`${cmdMusicPlayerDirPath}/actions`,
cmdMusicPlayerSettingVariablesDirPath=
	`${cmdMusicPlayerDirPath}/settingVariables`,
cmdMusicPlayerSettingsDirPath=
	`${cmdMusicPlayerDirPath}/settings`,
cmdMusicPlayerTempDirPath=
	`${cmdMusicPlayerDirPath}/temp`,
cmdMusicPlayerPlayListTableDirPath=
	`${cmdMusicPlayerDirPath}/playListTable`,
	cmdMusicPlayerEditDirPath=
	`${cmdMusicPlayerDirPath}/edit`,
cmdMusicPlayerListDirPath=
	`${cmdMusicPlayerDirPath}/list`,
cmdMusicPlayerDirListFilePath=
	`${cmdMusicPlayerListDirPath}/music_dir_list`,

// tsv path
cmdMusicPlayerPlayListName=
	`musicPlayList.tsv`,
cmdMusicPlayerPlayListPath=
	`${cmdMusicPlayerPlayListTableDirPath}/${cmdMusicPlayerPlayListName}`,
cmdMusicPlayerPreviousMusicPlayListName=
	"musicPreviousPlayList.tsv",
cmdMusicPlayerPreviousMusicPlayListPath=
	`${cmdMusicPlayerPlayListTableDirPath}/${cmdMusicPlayerPreviousMusicPlayListName}`,
cmdMusicPlayerLikePlayListName=
	`musicLikePlayList.tsv`,
cmdMusicPlayerLikePlayListPath=
	`${cmdMusicPlayerPlayListTableDirPath}/musicLikePlayList.tsv`,
cmdMusicPlayerTempPlayListPath=
	`${cmdMusicPlayerTempDirPath}/tempPlay.tsv`,

// js path
FANNEL_PATH=${0},

// js action
cmdMusicPlayerChangeStateAction=
	`${cmdMusicPlayerActionsDirPath}/changeStateAction.js`,
cmdMusicPlayerMusicAction=
	`${cmdMusicPlayerActionsDirPath}/musicAction.js`,
cmdMusicPlayerNormalPlayAction=
	`${cmdMusicPlayerActionsDirPath}/normalPlay.js`,
cmdMusicPlayerCopyToOtherAction=
	`${cmdMusicPlayerActionsDirPath}/copyToOther.js`,

// list path
cmdMusicPlayerPlayInfoPath=
	`${cmdMusicPlayerTempDirPath}/playInfo.tsv`,
cmdMusicPlayerTempFilePath=
	`${cmdMusicPlayerTempDirPath}/tempPlay.tsv`,

// common setting
cmdMusicPlayerSettingMenuConfigPath=
	`${cmdMusicPlayerSettingsDirPath}/settingMenuConfig.js`,
cmdMusicPlayerSettingButtonConfigPath=
	`${cmdMusicPlayerSettingsDirPath}/settingButtonConfig.js`,
cmdMusicPlayerSettingLongClickMenuConfigPath=
	`${cmdMusicPlayerSettingsDirPath}/settingLongClickMenuConfig.js`,

configHidValPath=
	`${cmdMusicPlayerSettingVariablesDirPath}/hideConfigVal.js`,

/// table state
settingimport=
	`${cmdMusicPlayerSettingVariablesDirPath}/tableRepVars.js`,

// manager state path
settingimport=
	`${cmdMusicPlayerSettingVariablesDirPath}/managerRepVars.js`,

/// config state
settingimport=
	`${cmdMusicPlayerSettingVariablesDirPath}/configRepVars.js`,