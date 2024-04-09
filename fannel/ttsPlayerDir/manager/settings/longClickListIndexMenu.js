
name=Delete
|icon=cancel
|jsPath=SIMPLE_DELETE
,

name=Rename
|icon=edit_frame
|jsPath=RENAME
,

name=Show
|icon=play
|jsPath=CAT,

name=Copy
|icon=copy
|tsvImport=`${cmdTtsPlayerManagerListIndexTsvPath}`
|js=
    if=`
        "${listDir}" == "${cmdTtsPlayerLikePlayListPath}"
        || "${listDir}" == "${cmdTtsPlayerPreviousTtsPlayListPath}"`
    ?func=exitZero
|js=
    var=fileList
    ?func=jsFileSystem.showFullFileList
    ?args=
        dirPath=`${cmdTtsPlayerPlayListTableDirPath}`
        &extraMapCon=`
            prefix=${TTS_PREFIX}
            |excludeFiles=
                ${cmdTtsPlayerPreviousTtsPlayListName}
                ?${cmdTtsPlayerLikePlayListName}`
|actionImport=
    `${cmdTtsPlayerCopyToOtherAction}`
|replace=
    COPY_TSV_PATH_TO_TYPE_CON=`${fileList}`,


name=Play
|icon=play
|actionImport=
    `${cmdTtsPlayerTtsAction}`
|replace=
    TEMP_PLAY_CON=
        `${ITEM_NAME}`
    ?EXTRA_CONTENT=
        `${jsF.r("${cmdTtsPlayerPlayInfoPath}")} ${jsPath.basename("${ITEM_NAME}")}`
,
