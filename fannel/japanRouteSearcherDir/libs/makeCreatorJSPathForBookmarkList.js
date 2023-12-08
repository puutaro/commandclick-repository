
function makeCreatorJSPathForBookmarkList(
    dirPath,
){
    const cmdValsCon = jsScript.readCmdValsCon("${0}");
    var japanRouteSearcherBookMarkNameSrc = jsScript.subValOnlyValue(
        "japanRouteSearcherBookmarkName",
        cmdValsCon,
    );
    if(!japanRouteSearcherBookMarkNameSrc){
        japanRouteSearcherBookMarkNameSrc = `${japanRouteSearcherBookmarkDefaultName}`;
    }
    japanRouteSearcherBookMarkNameSrc = jsPath.compPrefix(
        japanRouteSearcherBookMarkNameSrc,
        `${ROUTE_PREFIX}`
    );
    const japanRouteSearcherBookMarkName = jsPath.compExtend(
        japanRouteSearcherBookMarkNameSrc,
        `${TSV_SUFFIX}`,
    );
    return [dirPath, japanRouteSearcherBookMarkName].join('/');
}