
name=Delete
|icon=cancel
|func=SIMPLE_DELETE
,

name=Copy
|icon=copy
|alter=
    `shellIfPath=JUDGE_LIST_DIR
    |ifArgs=
        tsvPath=${cmdMusicPlayerManagerListIndexTsvPath}
        ?tsvValue="
            ${cmdMusicPlayerPreviousMusicPlayListPath}
            &${cmdMusicPlayerLikePlayListPath}"
        ?alterCon="|disable=ON" 
    `
|tsvVars="listDir => playTsvPath"
    ?importPath=`${cmdMusicPlayerManagerListIndexTsvPath}`
|var=playTsvName
    ?func=jsPath.basename
    ?args=
        path="${playTsvPath}"
|var=fileList
    ?func=jsFileSystem.showFullFileList
    ?args=
        dirPath=`${cmdMusicPlayerPlayListTableDirPath}`
        &extraMapCon=`
            prefix=${MUSIC_PREFIX}
            |excludeFiles=
                ${cmdMusicPlayerPreviousMusicPlayListName}
                ?${cmdMusicPlayerLikePlayListName}
                ?${playTsvName}
                `
|acVar=runCopyToOther
    ?importPath=
        `${cmdMusicPlayerCopyToOtherAction}`
    ?replace=
        COPY_TSV_PATH_TO_TYPE_CON=`${fileList}`,

name=Play
|icon=play
|var=mainPlayInfo
    ?func=jsFileSystem.read
    ?args=
        path=`${cmdMusicPlayerPlayInfoPath}`
|var=extraPlayInfo
    ?func=jsPath.basename
    ?args=
        tsvPath="${ITEM_NAME}"
|acVar=runCurRecPlay
    ?importPath=
        `${cmdMusicPlayerMusicAction}`
    ?replace=
        TEMP_PLAY_CON=`${ITEM_NAME}`
        &EXTRA_CONTENT=
            `${mainPlayInfo} ${extraPlayInfo}`
,
