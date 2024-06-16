
name=Delete
|icon=cancel
|func=SIMPLE_DELETE
,

name=Rename
|icon=edit_frame
|alter=
    `shellIfPath=JUDGE_LIST_DIR
    |ifArgs=
        tsvPath="${cmdTtsPlayerManagerListIndexTsvPath}"
        ?tsvValue="
            ${cmdTtsPlayerPreviousTtsPlayListPath}
            &${cmdTtsPlayerLikePlayListPath}
        "
        ?alterCon="|disable=ON"
    `
|func=RENAME
,

name=Show
|icon=file
|func=CAT,

name=Copy
|icon=copy
|alter=
    `shellIfPath=JUDGE_LIST_DIR
    |ifArgs=
        tsvPath=${cmdTtsPlayerManagerListIndexTsvPath}
        ?tsvValue="
            ${cmdTtsPlayerPreviousTtsPlayListPath}
            &${cmdTtsPlayerLikePlayListPath}"
        ?alterCon="|disable=ON"
    `
|tsvVars="listDir"
    ?importPath=`${cmdTtsPlayerManagerListIndexTsvPath}`
|var=curPlayListName
    ?func=jsPath.basename
    ?args=
        path="${listDir}"
|var=fileList
    ?func=jsFileSystem.showFullFileList
    ?args=
        dirPath=`${cmdTtsPlayerPlayListTableDirPath}`
        &extraMapCon=`
            prefix=${TTS_PREFIX}
            |suffix=PlayList${TSV_SUFFIX}
            |excludeFiles=
                ${cmdTtsPlayerPreviousTtsPlayListName}
                ?${cmdTtsPlayerLikePlayListName}
                ?${curPlayListName}
            `
    |var=runExitJudge
        ?when="!fileList"
        ?func=jsToast.short
        ?args=
            msg=`No exist copy list`
        ?func=exitZero
|acVar=runCopyToOtherList
    ?importPath=
        `${cmdTtsPlayerCopyToOtherAction}`
    ?replace=
        COPY_TSV_PATH_TO_TYPE_CON=`${fileList}`,


name=Play
|icon=play
|var=ttsFileName
    ?func=jsPath.basename
    ?args=
        path="${ITEM_NAME}"
|var=palyInfo
    ?func=jsFileSystem.read
    ?args=
        path="${cmdTtsPlayerPlayInfoPath}"
|acVar=runCurRecordPlay
    ?importPath=
        `${cmdTtsPlayerTtsAction}`
    ?replace=
        TEMP_PLAY_CON=
            `${ITEM_NAME}`
        &EXTRA_CONTENT=
            `${palyInfo} ${ttsFileName}`
,
