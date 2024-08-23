

/// LABELING_SECTION_START
// # ggleTranslator.js
// ----------------

// Launch google translate site by highlight text or no it @puutaro
// 
// 1. (highlight text) 
// 2. click
/// LABELING_SECTION_END


/// SETTING_SECTION_START
setVariableTypes="toLang:CB=en?ja?ko?zh-CN?zh-TW?uk?ru?es?fr"
setVariableTypes="onDialog:CB=true?false"
disableSettingValsEdit="ON"
/// SETTING_SECTION_END

/// CMD_VARIABLE_SECTION_START
toLang="en"
onDialog="true"
/// CMD_VARIABLE_SECTION_END


const highlightText = getSelectionText();
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
			return `https://translate.google.co.jp/?sl=auto&tl=${toLang}&text=${highlightText}&op=translate`;
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
	jsDialog.webView_S(
		ggleTransUrl,
		"",
	    "dismissType=both?label=❌",
	    "",
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
    return encodeURIComponent(text);
};
