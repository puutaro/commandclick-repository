

/// LABELING_SECTION_START
// Launch google translate site @puutaro
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



launchGgleTransSite();


function launchGgleTransSite(){
	const ggleTransUrl = 
		`https://translate.google.co.jp/?hl=ja&sl=auto&tl=${toLang}&op=translate`;
	if(onDialog != "true"){
		jsUrl.loadUrl(ggleTransUrl);
		exitZero();
	};
	jsDialog.webView(
		ggleTransUrl,
		"",
	    "",
	    "",
	    "",
	    "",
	    "",
	);
};
