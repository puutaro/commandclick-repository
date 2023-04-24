

/// LABELING_SECTION_START
// Advanced search twitter client @puutaro
// * BearerToken
// 		-> you get developer page this
// * play button
// 		-> start search
// * minRetweetCount
// 		-> minimum retweet
// * minLikeCount
// 		-> minimum retweet
// * minImpressionCount
// 		-> minimum impression
// * operator
// 		-> and or search operator
// * getTwLimit
// 		-> get tweet limit
// * max_Imp_ReTweet
// 		-> semiautomaticaly retweet max impression tweet
// --
// --
// bellow setting variable main line up
// * EditExecute is edit mode change
//	- NO is normal edit
//	- ONCE is one time edit and execute
//	- ALWAYD is always edit and execute
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
// * terminalFontZoom adjust terminal font size (percentage)
// * terminalFontColor adjust terminal font color
// * terminalColor adjust terminal background color
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
terminalOutputMode="REFLASH"
setReplaceVariable="CMD_TWITTER_DIR=${01}/${001}"
setReplaceVariable="SEARCH_WORD_LIST_DIR=${CMD_TWITTER_DIR}/list"
setReplaceVariable="SEARCH_WORD_LIST_PATH=${CMD_TWITTER_DIR}/list/searchWordList"
setVariableType="searchWord:ELCB=${SEARCH_WORD_LIST_PATH}"
setVariableType="minRetweetCount:NUM=!0..10000!1"
setVariableType="minImpressionCount:NUM=!0..10000!1"
setVariableType="appealHour:NUM=!1..10000!1"
setVariableType="minLikeCount:NUM=!0..10000!1"
setVariableType="operator:CB=or!and"
setVariableType="terminalFontZoom:NUM=!1..10000!1"
setVariableType="getTwLimit:NUM=!1..100!1"
setVariableType="max_Imp_ReTweet:BTN="
setVariableType="BearerToken:H="
terminalFontZoom="130"
terminalFontColor=""
terminalColor=""
scriptFileName="cmdTwitter.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
searchWord=""
max_Imp_ReTweet="::NoJsTermOut:: jsf '${0}' re "
minRetweetCount="0"
minLikeCount="0"
minImpressionCount="5"
appealHour="6"
operator="and"
getTwLimit="30"
BearerToken=""
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with shell script


let args = jsArgs.get().split("\t");
const firstArgs = args.at(0);
const TWEET_BASE_URL="https://twitter.com/TwitterJP/status/";
const defaultTermOutput = "NORMAL";
const CMD_TWITTER_DIR = "${CMD_TWITTER_DIR}";
const SEARCH_WORD_LIST_DIR = "${SEARCH_WORD_LIST_DIR}";
const SEARCH_WORD_LIST_PATH = "${SEARCH_WORD_LIST_PATH}";

const targetUrl = "https://api.twitter.com/2/tweets/search/recent";
const twStatus = "tweet.fields=attachments,author_id,created_at,public_metrics,source";
const searchQuery = "query=" + searchWord.replace("　", " ") + " -is:retweet";
const max_results="max_results=100";

const start_time = "start_time=" + getDatetime();


jsFileSystem.fileEcho(
	scriptFileName,
	terminalOutputMode,
);

var twDataList = [];
var pagination_token = undefined;
var seedMark = "";
twDataList = execGetTweet();
twDataList = sortTwDataList(
	twDataList
);
jsListSelect.updateListFileCon(
	SEARCH_WORD_LIST_PATH,
	searchWord
);
switch(firstArgs){
	case "re":
		maxImpReteet();
		exit();
		break;
};

let displayTwContentsSourceList = makeTwContentsSourceList(
	twDataList
);

jsFileSystem.jsEcho(
	defaultTermOutput,
	displayTwContentsSourceList
);

jsFileSystem.jsEcho(
	defaultTermOutput,
	"total: " + twDataList.length
);



function exit(){
	throw new Error('終了します');
};


function digitForm(
	targetDigit
){
	const digitPrefix = "000";
	return [digitPrefix, targetDigit].join("").slice(-2);
};

function getDatetime(){
	var dt = new Date();
	dt.setHours(dt.getHours() - appealHour);
	const datetimeStr = [
			dt.getUTCFullYear(), 
			digitForm(dt.getUTCMonth()+1), 
			digitForm(dt.getUTCDate()),  
		].join("-") + "T" + 
		[
			digitForm(dt.getUTCHours()), 
			digitForm(dt.getUTCMinutes()), 
			digitForm(dt.getUTCSeconds())
		].join(":") + "Z";
	return datetimeStr
};


function execGetTweet(){
	var curlTimes = 0;
	while(true){
		if(pagination_token == undefined){
			var requestBody = [searchQuery, twStatus, max_results, start_time].join("&");
		} else {
			var pagination_token = "pagination_token=" + pagination_token;
			var requestBody = [searchQuery, twStatus, max_results, start_time, pagination_token].join("&");
		};
		seedMark = seedMark + "#";
		if(curlTimes % 4 == 0){
			jsToast.short(
				seedMark,
			);
		};
		curlTimes++;
		if(
			jsStop.how().includes("true")
		) exit();
		var twJson = jsCurl.get(
			targetUrl,
			requestBody,
			 "Authorization\t" + "Bearer " + BearerToken,
			100000
		);
		if(
			jsStop.how().includes("true")
		) exit();
	
		var twJsonObj = JSON.parse(twJson.replaceAll("\n", ""));
		
		twDataList = twDataList.concat(
			twJsonObj.data.filter( function( twEl ) {
				if(operator == "and") {
					return twEl.public_metrics.retweet_count >= minRetweetCount
					&& twEl.public_metrics.retweet_count >= minRetweetCount
					&& twEl.public_metrics.like_count >= minLikeCount
					&& twEl.public_metrics.impression_count >= minImpressionCount
				} else {
					return twEl.public_metrics.retweet_count >= minRetweetCount
					|| twEl.public_metrics.retweet_count >= minRetweetCount
					|| twEl.public_metrics.like_count >= minLikeCount
					|| twEl.public_metrics.impression_count >= minImpressionCount
				}
			})
		);
		if(twDataList.length > getTwLimit) break;
		pagination_token = twJsonObj.meta.next_token;
		if(pagination_token == undefined) break;
	};
	return twDataList
};


function maxImpReteet(){
	const execShellPath = "${CMD_TWITTER_DIR}/cmdTwitter.sh";
	cmdIntent.run(
		"bash \"" + execShellPath + "\"  > /dev/null"
	);
	const maxImpUrl = TWEET_BASE_URL + twDataList.at(-1).id;
	location.href = maxImpUrl;
};

function sortTwDataList(
	twDataList
){
	return twDataList.sort(function(a, b) {
	  if (
	  	a.public_metrics.impression_count > b.public_metrics.impression_count
	  	) {
	    return 1;
	  } else {
	    return -1;
	  };
	});
};

function makeTwContentsSourceList(
	twDataList
){
	return twDataList.map(function( twData ) {
		var public_metrics = twData.public_metrics;
		var twText = twData.text.replaceAll("\n", "");
		var remakeTw = twText + " ";
		remakeTw = remakeTw + "imp: " + public_metrics.impression_count + " ";
		remakeTw = remakeTw + "like: " + public_metrics.like_count + " ";
		remakeTw = remakeTw + "re: " + public_metrics.retweet_count + " ";
		remakeTw = remakeTw + "cmdclickLeastTaga href=\"" + TWEET_BASE_URL + twData.id + "\"cmdclickGreatTagurlcmdclickLeastTag/acmdclickGreatTag\n";
	    return remakeTw;
	}).join("\n");
};
