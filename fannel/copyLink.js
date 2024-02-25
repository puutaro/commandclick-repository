

/// LABELING_SECTION_START
// # copyLink.js
// ----------------

// Copy link @puutaro

// Support long press menu table
// -------

// | type | enable |
// | ----- | ----- |
// | src anchor | o |
// | src image anchor | o |
// | image | x |

/// LABELING_SECTION_END

const LONG_PRESS_LINK_URL = "${LONG_PRESS_LINK_URL}";

end_judge();
jsUtil.copyToClipboard(LONG_PRESS_LINK_URL, 10);
jsToast.short(`Copy ok, ${LONG_PRESS_LINK_URL}`);

function end_judge(){
	if(
		!LONG_PRESS_LINK_URL.includes("/")
	) exitZero();
};
