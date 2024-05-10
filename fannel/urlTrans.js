

/// LABELING_SECTION_START
// # UrlTrans.js
// ----------------

// Translate site by add to homeScriptUrl or click @puutaro
/// LABELING_SECTION_END


/// SETTING_SECTION_START
setVariableTypes="toLang:CB=en?ja?ko?zh-CN?zh-TW?uk?ru?es?fr"
setVariableTypes="onDialog:CB=false?true"
scriptFileName="UrlTrans.js"
/// SETTING_SECTION_END

/// CMD_VARIABLE_SECTION_START
toLang="en"
onDialog="false"
/// CMD_VARIABLE_SECTION_END


const currentUrl = location.href;
urlCheck();
execTrans();


function urlCheck(){
	if(
		!currentUrl
	) exitZero();
	if(
		!currentUrl.startsWith("https://")
		&& !currentUrl.startsWith("http://")
	) {
		jsToast.short("no url");
		exitZero();
	};
};

function execTrans(){
	const ggTransQuery = 
		`https://translate.google.com/translate?sl=auto&tl=${toLang}&u=${currentUrl}`;
	if(onDialog != "true"){
		location.href = ggTransQuery;
		// jsUrl.loadUrl(ggTransQuery);
		exitZero();
	};
	jsDialog.webView_S(
		ggTransQuery,
	    "",
	    "dismissType=both?label=❌",
	    "",
	    "",
	);
};

