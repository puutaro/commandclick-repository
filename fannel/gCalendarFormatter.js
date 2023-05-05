

/// LABELING_SECTION_START
// Set format Google Calendar @puutaro
// 	* sourceUrl -> schedule mail url etc..
// 	* LAUNCH_URL-> Launch url
// --
// --
// bellow setting variable main line up
// * terminalOutputMode decide output mode in cmdclick terminal
//  - NORMAL: normal terminal output (default)
//  - REFLASH: Before terminal output, screen resflesh
//  - REFLASH_AND_FIRST_ROW: Before terminal output, screen resflesh and focus first row
//  - DEBUG: stdr + stderr
//  - NO: no output (bacground exec)
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalOutputMode="NORMAL"
setReplaceVariable="FANNEL_DIR_PATH=${01}/${001}"
setReplaceVariable="FANNEL_LIST_DIR_PATH=${FANNEL_DIR_PATH}/list"
setReplaceVariable="LAUNCH_URL_LIST_FILE_PATH=${FANNEL_LIST_DIR_PATH}/launch_url_list"
setReplaceVariable="EMAIL_LIST_FILE_PATH=${FANNEL_LIST_DIR_PATH}/email_list"
setVariableType="scheduleDate:DT="
setVariableType="biginTime:TM="
setVariableType="endTime:TM="
setVariableType="email:ELCB=${EMAIL_LIST_FILE_PATH}!10"
setVariableType="LAUNCH_URL:ELCBB=${LAUNCH_URL_LIST_FILE_PATH}!10|jsf '${0}' url"
scriptFileName="gCalendarFormatter.js"
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
		exit();
		break;
	case urlLaunchMode:
		jsListSelect.updateListFileCon(
			LAUNCH_URL_LIST_FILE_PATH,
			LAUNCH_URL
		);
		gmailLaunchMode();
		exit();
		break;
};