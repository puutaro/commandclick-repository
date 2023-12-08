
function launchJapanRouteSearchUrl(){
    const cmdValsCon = jsScript.readCmdValsCon("${0}");
    const lang = jsScript.subValOnlyValue(
        "lang",
        cmdValsCon
    );
    jsUrl.loadUrl(
        `${japanRouteSearcherLaunchUrl}${lang}`,
    );
}