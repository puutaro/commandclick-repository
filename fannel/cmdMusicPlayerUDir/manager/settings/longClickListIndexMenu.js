
name=Delete
|icon=cancel
|jsPath=SIMPLE_DELETE
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
    |disable=ON`
|tsvImport=`${cmdMusicPlayerManagerListIndexTsvPath}`
|js=
    var=fileList
    ?func=jsFileSystem.showFullFileList
    ?args=
        dirPath=`${cmdMusicPlayerPlayListTableDirPath}`
        &extraMapCon=`
            prefix=${MUSIC_PREFIX}
            |excludeFiles=
                ${cmdMusicPlayerPreviousMusicPlayListName}
                ?${cmdMusicPlayerLikePlayListName}
                ?${jsPath.basename("${listDir}")}
                `
|actionImport=
    `${cmdMusicPlayerCopyToOtherAction}`
|replace=
    COPY_TSV_PATH_TO_TYPE_CON=`${fileList}`,

name=Play
|icon=play
|actionImport=
    `${cmdMusicPlayerMusicAction}`
|replace=
    TEMP_PLAY_CON=
        `${ITEM_NAME}`
    ?EXTRA_CONTENT=
        `${jsF.r("${cmdMusicPlayerPlayInfoPath}")} ${jsPath.basename("${ITEM_NAME}")}`
,
