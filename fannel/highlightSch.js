

/// LABELING_SECTION_START
// google search highlight text @puutaro
/// LABELING_SECTION_END


let suffixEnum = {
	shell: ".sh",
	js: ".js",
	jsx: ".jsx",
	html: ".html",
	htm: ".htm",
};


let prefixEnum = {
	https: "https://",
	http: "http://",
};

const highlightUrlString = getSelectionText();
if(!highlightUrlString) exitZero();
execHighlightSearch(
	appendUrlPrefix(highlightUrlString)
);


function appendUrlPrefix(highlightUrlString){
	switch(true){
		case jsPath.checkExtend(highlightUrlString, suffixEnum.shell):
		case jsPath.checkExtend(highlightUrlString, suffixEnum.js):
		case jsPath.checkExtend(highlightUrlString, suffixEnum.jsx):
		case jsPath.checkExtend(highlightUrlString, suffixEnum.html):
		case jsPath.checkExtend(highlightUrlString, suffixEnum.htm):
			return highlightUrlString;
			break;
		case true:
			return `https://www.google.co.id/search?q=${highlightUrlString}`;
			break;
	};
};


function execHighlightSearch(urlString){
	switch(true){
		case jsPath.checkExtend(urlString, suffixEnum.shell):
			cmdIntent.run(
				"bash " + ` \"${urlString}\"`
			);
			break;
		case jsPath.checkExtend(urlString, suffixEnum.js):
		case jsPath.checkExtend(urlString, suffixEnum.jsx):
			const jsUrlStr = jsUrl.makeJsUrl(urlString);
			jsUrl.loadUrl(jsUrlStr);
			break;
		case jsPath.checkPrefix(urlString, prefixEnum.https):
		case jsPath.checkPrefix(urlString, prefixEnum.http):
		case jsPath.checkExtend(urlString, suffixEnum.html):
		case jsPath.checkExtend(urlString, suffixEnum.htm):
			jsDialog.webView(urlString);
			break;
	};
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
