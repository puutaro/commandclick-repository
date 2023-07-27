

/// LABELING_SECTION_START
// google search by dialog @puutaro
// * Support long press menu
//  - src anchor 
//  - src image anchor 
/// LABELING_SECTION_END


const urlString = makeUrl();
if(!urlString) exitZero();
jsDialog.webView(urlString);


function makeUrl(){
	const targetUrl = "CMDCLICK_LONG_PRESS_LINK_URL";
    const cmdclickLongPressLinkUrlStr = "CMDCLICK_ENCRPT_LONG_PRESS_LINK_URL".replace(
        "_ENCRPT",
        ""
    );
    if(
        targetUrl != cmdclickLongPressLinkUrlStr
    ) return targetUrl;
    return "https://www.google.co.id/search?q=";
};
