

/// LABELING_SECTION_START
// Set format Google Calendar @puutaro
// sourceUrl: schedule mail url etc..
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
setVariableType="scheduleDate:DT="
setVariableType="biginTime:TM="
setVariableType="endTime:TM="
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
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with shell script


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
