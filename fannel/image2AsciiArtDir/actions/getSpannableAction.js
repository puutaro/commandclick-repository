// js/action

tsvImport=`${image2AsciiArtAsciiListIndexTsvPath}`
    ?use="listDir => curAsciiStateListDirPath"
|var=varAsciiStateListDirPath
    ?value=`{{ ASCII_STATE_LIST_DIR_PATH:${curAsciiStateListDirPath} }}`
|var=imageStateListDir
    ?value=`${varAsciiStateListDirPath}/${imageDirName}`
|var=downloadImagePath
    ?func=jsCurl.getImage
    ?args=
        url=`${LONG_PRESS_IMAGE_URL}`
|var=downloadImageName
    ?func=jsPath.basename
    ?args=
        path=NO_QUOTE:downloadImagePath
|var=destiImagePath
    ?value=`${imageStateListDir}/${downloadImageName}`
|func=jsFileSystem.copyFile
    ?args=
        srcPath=`NO_QUOTE:downloadImagePath`
        &destiPath=`${destiImagePath}`
|func=jsDialog.asciiArtDialog
    ?args=
        title="Ascii image"
        &imagePath=`${destiImagePath}`
        &asciiArtMapCon=`
            savePath=${varAsciiStateListDirPath}/${downloadImageName}
            |hideButtons=cancel
            `
|func=alert
    ?args=msg=`${varAsciiStateListDirPath}/${downloadImageName}\n\n`
|func=jsBroadcast.send
    ?args=
        action="com.puutaro.commandclick.edit_frag.update_index_list"
        &broadCastMapStr=
// |func=jsDialog.webViewDismiss_S
|func=jsToast.short
    ?args=
        msg="download ok",