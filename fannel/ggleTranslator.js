

/// LABELING_SECTION_START
// # ggleTranslator.js
// ----------------

// Launch google translate site by highlight text or no it @puutaro
// 
// 1. (highlight text) 
// 2. click
/// LABELING_SECTION_END


/// SETTING_SECTION_START
setVariableTypes="toLang:CB=en!ja!ko!zh-CN!zh-TW!uk!ru!es!fr"
setVariableTypes="onDialog:CB=true!false"
scriptFileName="ggleTranslator.js"
/// SETTING_SECTION_END

/// CMD_VARIABLE_SECTION_START
toLang="en"
onDialog="true"
/// CMD_VARIABLE_SECTION_END


const highlightText = getSelectionText().replaceAll("%", "%25");
const transUrl = makeTransUrl(highlightText);
launchGgleTransSite(
	transUrl
);


function makeTransUrl(
	highlightText
){
	switch(true){
		case !highlightText:
			return `https://translate.google.co.jp/?sl=auto&tl=${toLang}&op=translate`;
			break;
		case highlightText !== "":
			const highlightTextNoWrap = highlightText.replaceAll("\n", " ");
			return `https://translate.google.co.jp/?sl=auto&tl=${toLang}&text=${highlightTextNoWrap}&op=translate`;
			break;
	};
};


function launchGgleTransSite(
	ggleTransUrl
){
	if(onDialog != "true"){
		jsUrl.loadUrl(ggleTransUrl);
		exitZero();
	};
	jsDialog.webView(
		ggleTransUrl,
		"",
	    "dismissType=both!iconName=cancel",
	    "",
	);
};


function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
        window.getSelection().removeAllRanges();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    };
    return text;
};
