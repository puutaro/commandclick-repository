
name=Delete
|icon=cancel
|func=SIMPLE_DELETE
,

name=Copy
|icon=copy
|alter=
    `shellIfPath=JUDGE_LIST_DIR
    |ifArgs=
        tsvPath=${cmdYoutuberManagerListIndexTsvPath}
        ?tsvValue="
            ${cmdYoutuberPreviousMusicPlayListPath}
            &${cmdYoutuberLikeMusicPlayListPath}"
    |disable=ON`
|tsvImport=`${cmdYoutuberManagerListIndexTsvPath}`
    ?use="listDir => curPlayListPath"
|var=curPlayListName
    ?func=jsPath.basename
    ?args=path="${curPlayListPath}"
|var=fileList
    ?func=jsFileSystem.showFullFileList
    ?args=
        dirPath=`${cmdYoutuberPlayListTableDirPath}`
        &extraMapCon=`
            prefix=${TUBE_PREFIX}
            |excludeFiles=
                ${cmdYoutuberPreviousMusicPlayListName}
                ?${cmdYoutuberLikeMusicPlayListName}
                ?${cmdYoutuberWebSearchPlayListName}
                ?${curPlayListName}
        `
    ?exitJudge=`!fileList`
    ?exitToast="No exist copy list"
|actionImport=
    `${cmdYoutuberCopyToOtherAction}`
|replace=
    COPY_TSV_PATH_TO_TYPE_CON=`${fileList}`,

name=Play
|icon=play
|var=playInfo
    ?func=jsFileSystem.read
    ?args=
        playInfoPath=`"${cmdYoutuberPlayInfoPath}"  `
|var=curPlayListName
    ?func=jsPath.basename
    ?args=playListPath="${ITEM_NAME}"
|actionImport=
    `${cmdYoutuberMusicAction}`
|replace=
    TEMP_PLAY_CON=
        `${ITEM_NAME}`
    ?EXTRA_CONTENT=
        `${playInfo} ${curPlayListName}`
,
