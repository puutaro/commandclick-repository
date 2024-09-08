

/// LABELING_SECTION_START
// # urlIntender.js
// ----------------

// Send intend by current page url @puutaro
// ## Support long press menu
// -------------

// | type | enable |
// | ----- | ----- |
// | src anchor | o |
// | src image anchor | o |
// | image | x |

/// LABELING_SECTION_END


const intendUrl = decideCurrentUrl();
jsIntent.launchUrl(
	intendUrl
);


function decideCurrentUrl(){
	const longPressLinkUrl = "${LONG_PRESS_LINK_URL}";
	if(
		longPressLinkUrl.startsWith("https://")
	) return longPressLinkUrl;
	const cmdclickCurrentUrl = "${CMDCLICK_CURRENT_PAGE_URL}";
	const cmdclickLongPressLinkUrlStr = 
		"${ENCRPT_CURRENT_PAGE_URL}".replace(
	        "ENCRPT_",
	        ""
	    );
	if(
        cmdclickCurrentUrl != cmdclickLongPressLinkUrlStr
    ) return cmdclickCurrentUrl;
    return location.href;
};
