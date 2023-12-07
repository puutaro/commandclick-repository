
function launchJapanRouteSearchUrl(){
    jsScript.readCmdValsCon("${0}");
    const lang = jsScript.getCmdVal(
        "lang",
    );
    jsUrl.loadUrl(
        `${japanRouteSearcherLaunchUrl}${lang}`,
    );
}