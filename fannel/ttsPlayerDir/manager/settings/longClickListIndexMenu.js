
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
    |disable=ON`
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
    |disable=ON`
|tsvImport=`${cmdTtsPlayerManagerListIndexTsvPath}`
    ?use="listDir"
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
    ?exitJudge=`!fileList`
    ?exitToast=`No exist copy list`
|actionImport=
    `${cmdTtsPlayerCopyToOtherAction}`
|replace=
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
|actionImport=
    `${cmdTtsPlayerTtsAction}`
|replace=
    TEMP_PLAY_CON=
        `${ITEM_NAME}`
    ?EXTRA_CONTENT=
        `${palyInfo} ${ttsFileName}`
,
