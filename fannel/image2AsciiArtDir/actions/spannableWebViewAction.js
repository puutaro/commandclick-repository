// js/action

var=menuMapStrListStr
    ?value=`
        clickMenuFilePath=GO_BACK.js
            ?dismissType=longpress
            ?caption=back
            ?iconName=back
        |clickMenuFilePath=HIGHLIGHT_SCH.js
            ?caption=search
            ?iconName=google
        |caption=exit
            ?iconName=cancel
            ?dismissType=both
        `
|var=longPressMenuListStr
    ?value=`
        srcImageAnchorMenuFilePath=${image2AsciiArtGetSpannableAction}
        ?imageMenuFilePath=${image2AsciiArtGetSpannableAction}
        `
|var=encodeSpace
    ?value=NO_QUOTE:encodeURIComponent(" ")
|var=runLaunchGetSpannableWebView
    ?func=jsDialog.webView_S
    ?args=
        url=`${getUrl}${encodeSpace}`
        &currentFannelPath=`${FANNEL_PATH}`
        &menuMapCon=`${menuMapStrListStr}`
        &longPressAnchorMenu=`${longPressMenuListStr}`
        &extraMapCon=,
