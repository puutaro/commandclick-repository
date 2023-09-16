

/// LABELING_SECTION_START
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
	const cmdclickCurrentUrl = "CMDCLICK_CURRENT_PAGE_URL";
	const cmdclickLongPressLinkUrlStr = 
		"CMDCLICK_ENCRPT_CURRENT_PAGE_URL".replace(
	        "_ENCRPT",
	        ""
	    );
	if(
        cmdclickCurrentUrl != cmdclickLongPressLinkUrlStr
    ) return cmdclickCurrentUrl;
    return location.href;
};
