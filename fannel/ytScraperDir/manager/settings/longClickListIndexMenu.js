
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
        ?alterCon="|disable=ON"
    `
|tsvVars="listDir => curPlayListPath"
    ?importPath=`${cmdYoutuberManagerListIndexTsvPath}`
|var=curPlayListName
    ?func=jsPath.basename
    ?args=
        path="${curPlayListPath}"
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
    |var=runExitJudge
        ?when=`!fileList`
        ?func=jsToast.short
        ?args=
            msg="No exist copy list"
        ?func=exitZero
|acVar=runCopyToOtherList
    ?importPath=
        `${cmdYoutuberCopyToOtherAction}`
    ?replace=
        COPY_TSV_PATH_TO_TYPE_CON=`${fileList}`,

name=Play
|icon=play
|var=playInfo
    ?func=jsFileSystem.read
    ?args=
        playInfoPath=`"${cmdYoutuberPlayInfoPath}"  `
|var=curPlayListName
    ?func=jsPath.basename
    ?args=
        playListPath="${ITEM_NAME}"
|acVar=runCurPlay
    ?importPath=
        `${cmdYoutuberMusicAction}`
    ?replace=
        TEMP_PLAY_CON=
            `${ITEM_NAME}`
        &EXTRA_CONTENT=
            `${playInfo} ${curPlayListName}`
,
