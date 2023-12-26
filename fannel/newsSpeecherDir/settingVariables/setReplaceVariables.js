// basic
TXT_LABEL=label,
BTN_CMD=cmd,
BTN_LABEL=label,
LIST_PATH=listPath,
LIMIT_NUM=limitNum,
FCB_DIR_PATH=dirPath,
FCB_PREFIX=prefix,
FCB_SUFFIX=suffix,
FCB_TYPE=type,

// args
SUMMARY_MODE="Summary",
RE_SUMMARY_MODE="reSumamry",
LONG_PRESS_SUMMARY_MODE="longPressSumamry",
STOP_MODE="stop",
SETTIN_MODE="setting",
INSTALL_MODE="Install",
EDIT_NEWS_URL_LIST_NAME_MODE="EDIT_NEWS_URL_LIST_NAME_MODE",
URL_HISTORY_CLICK_MODE="urlHistoryClick",

// setting
LONG_PRESS_EACH_NUM=50,
WAIT_NOTIFICATION_CHANNEL_NUM=22,
EACH_NUM_MIN=5,
DEFAULT_EDIT_TSV_NAME=
	"newsUrlEditSite.tsv",
LONG_PRESS_EDIT_TSV_NAME=
	"newsUrlLongPressEditSite.tsv",
NEWS_SPEECHER_PREFIX=
	"news",
TSV_EXTEND=
	".tsv",

// dirpath
NEWS_SPEECHER_DIR_PATH=
	"${01}/${001}",
NEWS_SPEECHER_SHELL_DIR_PATH=
	"${NEWS_SPEECHER_DIR_PATH}/shell",
NEWS_SPEECHER_EDIT_DIR_PATH=
	"${NEWS_SPEECHER_DIR_PATH}/edit",
newsSpeecherShellPyDirPath=
	"${NEWS_SPEECHER_SHELL_DIR_PATH}/py",
newsSpeecherShellTempDirPath=
	"${NEWS_SPEECHER_SHELL_DIR_PATH}/temp",

// file path
NEWS_SPEECHER_PATH=
	"${0}",
NEWS_SPEECHER_ARGS_TSV_PATH=
	"${newsSpeecherShellTempDirPath}/args.tsv",
NEWS_SPEECHER_SUMMARIZE_SHELL_PATH=
	"${NEWS_SPEECHER_SHELL_DIR_PATH}/summarize.sh",
NEWS_SPEECHER_CAT_AND_SPEECH_SHELL_PATH=
	"${NEWS_SPEECHER_SHELL_DIR_PATH}/cat_and_speech.sh",
NEWS_SPEECHER_CREATE_PLAY_LIST_SHELL_PATH=
	"${NEWS_SPEECHER_SHELL_DIR_PATH}/create_play_list.sh",
NEWS_SPEECHER_INSTALL_SHELL_PATH=
	"${NEWS_SPEECHER_SHELL_DIR_PATH}/install.sh",
NEWS_SPEECHER_STOP_ALL_PROCESS_SHELL_PATH=
	"${NEWS_SPEECHER_SHELL_DIR_PATH}/stop_all_process.sh",
NEWS_SPEECHER_SUMMARY_OUTPUT_PY_PATH=
	"${newsSpeecherShellPyDirPath}/output.py",
NEWS_SPEECHER_SUMMARY_OUTPUT_FOR_TRANS_TXT_PATH=
	"${newsSpeecherShellTempDirPath}/output_for_trans.txt",
NEWS_SPEECHER_SUMMARY_OUTPUT_FOR_NORMAL_TXT_PATH=
	"${newsSpeecherShellTempDirPath}/output_for_nomal.txt",
NEWS_SPEECHER_TRANS_OUTPUT_TXT_PATH=
	"${newsSpeecherShellTempDirPath}/trans_output.txt",
NEWS_SPEECHER_CREATE_SRC_TEXT_SHELL_PATH=
	"${newsSpeecherShellTempDirPath}/create.sh",

// system file path
APP_URL_HISTORY_PATH=
	"${01}/system/url/cmdclickUrlHistory.tsv",