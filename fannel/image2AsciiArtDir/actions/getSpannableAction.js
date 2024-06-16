// js/action

|acVar=varAsciiStateListDirPathArg
    ?importPath=
        `${image2AsciiArtGetSpannableActionLibs}/
            makeVarAsciiStateListDirPath.js`
    ?replace=
        ASCII_STATE_LIST_DIR_PATH=
            `{{ ASCII_STATE_LIST_DIR_PATH:${curAsciiStateListDirPath} }}`
|acVar=runGetAscii
    ?importPath=
        `${image2AsciiArtGetSpannableActionLibs}/
            makeAndCopyAscii.js`
    ?replace=
        VAR_ASCII_STATE_LIST_DIR_PATH=`${varAsciiStateListDirPathArg}`
        &LONG_PRESS_IMAGE_URL=`${LONG_PRESS_IMAGE_URL}`

|var=runFinishSync
    ?func=jsBroadcast.send
    ?args=
        action="com.puutaro.commandclick.edit_frag.update_index_list"
        &broadCastMapStr=
    ?func=jsToast.short
    ?args=
        msg="download ok",