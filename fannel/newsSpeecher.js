

/// LABELING_SECTION_START
// https://github.com/puutaro/newsSpeecher
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
onAutoExec="OFF"
terminalSizeType="LONG"
terminalOutputMode="NORMAL"
execPlayBtnLongPress="WEB_SEARCH"
execEditBtnLongPress="PAGE_SEARCH"
onUpdateLastModify="ON"
onUrlHistoryRegister="ON"
terminalFontZoom="0"
terminalColor=""
terminalFontColor=""
homeScriptUrlsPath=""
srcImageAnchorLongPressMenuFilePath=""
srcAnchorLongPressMenuFilePath=""
setReplaceVariables="file://"
setVariableTypes="file://"
hideSettingVariables="file://"
scriptFileName="newsSpeecher.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
SPEECH_MODE="shuffle"
EACH_NUM="5"
Summary=""
RE_SUMMARY=""
STOP=""
SETTING=""
newsUrlListName=""
EDIT_NEWS_URL_LIST_NAME=""
Install=""
TO_LANG="-"
ON_SPEECH="ON"
ON_BEFORE_SUMMARY="ON"
ON_OUTPUT_IN_HISTRORY_CLICK="OFF"
MAX_CONCUR=5
PICH=50
SUMMARY_LENGTH="300"
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript


const LONG_PRESS_NEWS_URL = "CMDCLICK_LONG_PRESS_LINK_URL";
let args = jsArgs.get().split("\t");
const FIRST_ARG = decide_arg(args[0]);

installModeHandler();
// execOnAutoExec();
const EDIT_URL_LIST_PATH = makeEditUrlListPath();
const PLAY_LIST_TEMP_DIR_PATH = makePlaySrcDirPath();
const PLAY_LIST_TEMP_SRC_DIR_PATH = `${PLAY_LIST_TEMP_DIR_PATH}/src`;
jsFileSystem.createDir(PLAY_LIST_TEMP_SRC_DIR_PATH);
const PLAY_CONTENTS_TXT_PATH = `${PLAY_LIST_TEMP_DIR_PATH}/contents.txt`;
const NEWS_PLAY_LIST_TSV_PATH = `${PLAY_LIST_TEMP_DIR_PATH}/play_list.tsv`;

argSwitcher();

function argSwitcher() {
	jsFileSystem.createDir(
		"${newsSpeecherShellTempDirPath}"
	);
	updateByVariableWhenDiff(
		"newsUrlListName",
		EDIT_URL_LIST_PATH.split("/").at(-1),
	);
	saveArgsTsv();
	endByEachNum();
	bootUbuntu();
	switch(FIRST_ARG){
		case "":
			editSiteHandler();
			break;
		case "${STOP_MODE}":
			execProcessStop();
			break;
		case "${EDIT_NEWS_URL_LIST_NAME_MODE}":
			editUrlListHandler();
		    break;
		case "${SETTIN_MODE}":
			settingHandler();
			break;
		case "${RE_SUMMARY_MODE}":
			reSumamryHandler();
			break;
		case "${URL_HISTORY_CLICK_MODE}":
		case "${SUMMARY_MODE}":
			summaryHandler();
			break;
		case "${LONG_PRESS_SUMMARY_MODE}":
			longPressSummaryHandler();
			break;
	};
};


function editSiteHandler(){
	let extraMapStr = [
		`src_path=${APP_URL_HISTORY_PATH}`,
		`on_click_sort=false`,
		'on_sortable_js=true',
		`on_click_url=true`,
		`on_dialog=false`,
		`extra_js_path_list=${01}/system/js/clipToHistory.js`,
		`extra_label=CtoH`,
	].join("|");
	jsIntent.launchEditSite(
		EDIT_URL_LIST_PATH,
		extraMapStr,
		"urlString.startsWith('http');",
	);
};

function execProcessStop(){
	jsToast.short("stop..");
	jsUbuntu.execScriptByBackground(
		"${NEWS_SPEECHER_STOP_ALL_PROCESS_SHELL_PATH}",
		"",
		1,
	);
};

function longPressSummaryHandler(){
	jsToast.short(`long press summary..`);
	jsFileSystem.writeLocalFile(
		EDIT_URL_LIST_PATH,
		`${LONG_PRESS_NEWS_URL}\t${LONG_PRESS_NEWS_URL}`
	);
	jsUbuntu.execScriptByBackground(
		"${NEWS_SPEECHER_SUMMARIE_CONTROLLER_SHELL_PATH}",
		"",
		1,
	);
};

function summaryHandler(){
	jsToast.short(`summary..`);
	jsUbuntu.execScriptByBackground(
		"${NEWS_SPEECHER_SUMMARIE_CONTROLLER_SHELL_PATH}",
		"",
		1,
	);
};

function reSumamryHandler() {
	jsToast.short(`re-summary..`);
	jsUbuntu.execScriptByBackground(
		"${NEWS_SPEECHER_RE_SUMMARIZE_CONTROLLER_SHELL_PATH}",
		"high",
		1,
	);
};

function editUrlListHandler(){
	const setVariableTypeCon = [
		`newsUrlListName:TXT:FSB=${FCB_DIR_PATH}=${NEWS_SPEECHER_EDIT_DIR_PATH}`,
		`${FCB_PREFIX}=${NEWS_SPEECHER_PREFIX}`,
		`${FCB_SUFFIX}=${TSV_EXTEND}`,
	].join("!");
	jsFileSelect.execEditTargetFileName(
	    "newsUrlListName",
		"renameNewsUrlListName",
		"${NEWS_SPEECHER_EDIT_DIR_PATH}",
		setVariableTypeCon,
		`newsUrlListName=${newsUrlListName}\trenameNewsUrlListName=`,
		"${NEWS_SPEECHER_PREFIX}",
		"${TSV_EXTEND}",
        "${NEWS_SPEECHER_PATH}",
        "Edit newsUrlListName"
    );
};

function getLang(){
	if(
		TO_LANG == "-" 
		|| TO_LANG == ""
	) return jsUtil.lang();
	return TO_LANG;
};

function endByEachNum(){
	switch(FIRST_ARG){
		case "":
		case "${STOP_MODE}":
		case "${EDIT_NEWS_URL_LIST_NAME_MODE}":
		case "${SETTIN_MODE}":
			return;
	};
	if(
		EACH_NUM < Number("${EACH_NUM_MIN}")
	) {
		jsToast.short(`Set EACH_NUM: ${EACH_NUM}`);
		exitZero();
	};
};

function makeEditUrlListPath(){
	jsFileSystem.createDir("${NEWS_SPEECHER_EDIT_DIR_PATH}");
	if(
		FIRST_ARG == "${LONG_PRESS_SUMMARY_MODE}"
	) return `${NEWS_SPEECHER_EDIT_DIR_PATH}/${LONG_PRESS_EDIT_TSV_NAME}`;
	if(
		!newsUrlListName
	) return `${NEWS_SPEECHER_EDIT_DIR_PATH}/${DEFAULT_EDIT_TSV_NAME}`;
	const prefixCompUrlListName = jsPath.compPrefix(
		newsUrlListName,
		"${NEWS_SPEECHER_PREFIX}",
	);
	const compNewsUrlListName = jsPath.compExtend(
        prefixCompUrlListName,
    	"${TSV_EXTEND}"
    );
	return `${NEWS_SPEECHER_EDIT_DIR_PATH}/${compNewsUrlListName}`;
};

function makePlaySrcDirPath() {
	const playListTempDirName = jsPath.removeExtend(
		EDIT_URL_LIST_PATH.split("/").at(-1),
		"${TSV_EXTEND}",
	);
	return `${newsSpeecherShellTempDirPath}/${playListTempDirName}`;
};

function updateByVariableWhenDiff(
	tergetVariableName,
	currentVariableValue,
){
	jsEdit.updateByVariable(
		"${NEWS_SPEECHER_PATH}",
	    tergetVariableName,
	    currentVariableValue
	);
};

function settingHandler(){
	const setVariableContents = [
		`TO_LANG:CB=-!ja!en!zh!es!ko`,
		`ON_SPEECH:LBL:CB=${TXT_LABEL}=THIS|ON!OFF`,
		`ON_BEFORE_SUMMARY:LBL:CB=${TXT_LABEL}=THIS|ON!OFF`,
		`ON_OUTPUT_IN_HISTRORY_CLICK:LBL:CB=${TXT_LABEL}=THIS|ON!OFF`,
		`PICH:TXT:LBL:NUM=${TXT_LABEL}=Pich (normal: 50)|!1..100!1`,
		`SUMMARY_LENGTH:TXT:LBL:NUM=${TXT_LABEL}=THIS|!100..1000!100`,
		`MAX_CONCUR:TXT:LBL:NUM=${TXT_LABEL}=Max concur (default: 5)|!2..20!1`,
	].join("\t");
	const varNameValCon = [
		`TO_LANG=${TO_LANG}`,
		`ON_SPEECH=${ON_SPEECH}`,
		`ON_BEFORE_SUMMARY=${ON_BEFORE_SUMMARY}`,
		`ON_OUTPUT_IN_HISTRORY_CLICK=${ON_OUTPUT_IN_HISTRORY_CLICK}`,
		`PICH=${PICH}`,
		`SUMMARY_LENGTH=${SUMMARY_LENGTH}`,
		`MAX_CONCUR=${MAX_CONCUR}`,
	].join("\t");
	jsValEdit.editAndSaveCmdVar(
        "Setting",
        "${NEWS_SPEECHER_PATH}",
        setVariableContents,
        varNameValCon,
    );
};

function installModeHandler(){
	if(
		FIRST_ARG != "${INSTALL_MODE}"
	) return;
	jsToast.short("Installing..");
	jsUbuntu.execScriptByBackground(
		"${NEWS_SPEECHER_INSTALL_SHELL_PATH}",
		"",
		1,
	);
	exitZero();
};

function execOnAutoExec(){
	if(
		FIRST_ARG != "onAutoExec"
	) return;
	jsUbuntu.boot();
	exitZero();
};

function saveArgsTsv(){
	switch(FIRST_ARG){
		case "":
		case "${STOP_MODE}":
		case "${EDIT_NEWS_URL_LIST_NAME_MODE}":
		case "${SETTIN_MODE}":
			return;
	};
	const summaryArgsCon = [
		`EACH_NUM\t${EACH_NUM}`,
		`TO_LANG\t${getLang()}`,
		`SPEECH_MODE\t${SPEECH_MODE}`,
		`ON_SPEECH\t${ON_SPEECH}`,
		`ON_BEFORE_SUMMARY\t${ON_BEFORE_SUMMARY}`,
		`ON_OUTPUT\t${decide_on_output()}`,
		`SUMMARY_LENGTH\t${SUMMARY_LENGTH}`,
		`MAX_CONCUR\t${MAX_CONCUR}`,
		`PICH\t${PICH}`,
		`EDIT_URL_LIST_PATH\t${EDIT_URL_LIST_PATH}`,
		`PLAY_LIST_TEMP_DIR_PATH\t${PLAY_LIST_TEMP_DIR_PATH}`,
		`PLAY_LIST_TEMP_SRC_DIR_PATH\t${PLAY_LIST_TEMP_SRC_DIR_PATH}`,
		`PLAY_CONTENTS_TXT_PATH\t${PLAY_CONTENTS_TXT_PATH}`,
		`NEWS_PLAY_LIST_TSV_PATH\t${NEWS_PLAY_LIST_TSV_PATH}`,
	].join("\n");
	jsFileSystem.writeLocalFile(
		"${NEWS_SPEECHER_ARGS_TSV_PATH}",
		summaryArgsCon
	);
};

function bootUbuntu(){
	switch(FIRST_ARG){
		case "":
		case "${EDIT_NEWS_URL_LIST_NAME_MODE}":
		case "${SETTIN_MODE}":
			return;
	};
	jsUbuntu.boot();
};

function decide_arg(first_arg){
	if(
		LONG_PRESS_NEWS_URL.includes("https://")
	) return "${LONG_PRESS_SUMMARY_MODE}";
	return first_arg;
};

function decide_on_output(){
	if(
		FIRST_ARG == "${URL_HISTORY_CLICK_MODE}"
		&& ON_OUTPUT_IN_HISTRORY_CLICK == "OFF"
	) return "OFF";
	return "ON";
};
