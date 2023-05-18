

/// LABELING_SECTION_START
// google search copy text @puutaro
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


const cpUrlString = jsUtil.echoFromClipboard();
execCpSearch(
	appendUrlPrefix(cpUrlString)
);


function appendUrlPrefix(cpUrlString){
	switch(true){
		case jsPath.checkExtend(cpUrlString, suffixEnum.shell):
		case jsPath.checkExtend(cpUrlString, suffixEnum.js):
		case jsPath.checkExtend(cpUrlString, suffixEnum.jsx):
		case jsPath.checkExtend(cpUrlString, suffixEnum.html):
		case jsPath.checkExtend(cpUrlString, suffixEnum.htm):
			return cpUrlString;
			break;
		case true:
			return `https://www.google.co.id/search?q=${cpUrlString}`;
			break;
	};
};


function execCpSearch(urlString){
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
			jsUrl.loadUrl(urlString);
			break;
	};
};
