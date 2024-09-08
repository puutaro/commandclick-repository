

/// LABELING_SECTION_START
// https://github.com/puutaro/gCalendarFormatter
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalOutputMode="NORMAL"
onAdBlock="OFF"
disableSettingValsEdit="ON"
setReplaceVariables="file://"
setVariableTypes="file://"
hideSettingVariables="file://"
playButtonConfig="icon=shortcut,caption=rgistrCalendar"
settingButtonConfig="icon=open_close,caption=opnClse,click=func=SIZING,longClick=func="
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
scheduleDate=""
biginTime=""
endTime=""
title=""
webMeetUrl=""
sourceUrl=""
otherUrl=""
memo=""
eventLocation=""
email=""
LAUNCH_URL=""
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with shell script



let args = jsArgs.get().split("\t");
const firstArgs = args.at(0);
const FANNEL_LIST_DIR_PATH = "${FANNEL_LIST_DIR_PATH}";
jsFileSystem.createDir(FANNEL_LIST_DIR_PATH);
const LAUNCH_URL_LIST_FILE_PATH = "${LAUNCH_URL_LIST_FILE_PATH}";
const EMAIL_LIST_FILE_PATH = "${EMAIL_LIST_FILE_PATH}";
const gCalendarMode = "";
const urlLaunchMode = "url";

function execRegistCurrendar(){
	jsListSelect.updateListFileCon(
		EMAIL_LIST_FILE_PATH,
		email
	);
		
	let scheduleDateList = scheduleDate.split("-");
	const year = scheduleDateList.at(0);
	const month = scheduleDateList.at(1) - 1;
	const day = scheduleDateList.at(2);
	const correctScheduleDate = year + "-" + month + "-" + day;
	const beginDateTime = correctScheduleDate + "T" + biginTime;
	const endDateTime = correctScheduleDate + "T" + endTime;
	const beginMiliTime = jsUtil.convertDateTimeToMiliTime(beginDateTime);
	const endMiliTime = jsUtil.convertDateTimeToMiliTime(endDateTime);
	const description = "webMeetUrl:\n" + webMeetUrl +
		"\nsourceUrl:\n" + sourceUrl + 
		"\n" + "otherUrl:\n" + otherUrl +
		"\n" + "memo:\n" + memo;	

	const extraString = "title=" + title + 
		"\tdescription=" + description + 
		"\teventLocation=" + eventLocation +
		"\tandroid.intent.extra.EMAIL=" + email;

	const extraInt = "";
	const extraLong = "beginTime=" + beginMiliTime + 
		"\tendTime=" + endMiliTime;
	const extraFloat = "";

	const intentType = "android.intent.action.INSERT";
	const actionType = "content://com.android.calendar/events";

	jsIntent.launchApp(
		intentType,
		actionType,
		extraString,
		extraInt,
		extraLong,
		extraFloat,
	);
};


function gmailLaunchMode(){
	window.location.href = LAUNCH_URL;
};


switch(firstArgs){
	case gCalendarMode:
		execRegistCurrendar();
		exitZero();
		break;
	case urlLaunchMode:
		jsListSelect.updateListFileCon(
			LAUNCH_URL_LIST_FILE_PATH,
			LAUNCH_URL
		);
		gmailLaunchMode();
		exitZero();
		break;
};