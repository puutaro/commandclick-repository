

const LONG_PRESS_NEWS_URL = "CMDCLICK_LONG_PRESS_LINK_URL";

end_judge();
jsUtil.copyToClipboard(LONG_PRESS_NEWS_URL, 10);
jsToaat.short(`Copy ok, ${LONG_PRESS_NEWS_URL}`);

function end_judge(){
	if(
		!LONG_PRESS_NEWS_URL.includes("https://")
	) exitZero();
};
