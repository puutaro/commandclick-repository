
name=Delete
|icon=cancel
|jsPath=SIMPLE_DELETE
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
|js=
    var=fileList
    ?func=jsFileSystem.showFullFileList
    ?args=
        dirPath=`${cmdYoutuberPlayListTableDirPath}`
        &extraMapCon=`
            prefix=${TUBE_PREFIX}
            |excludeFiles=
                ${cmdYoutuberPreviousMusicPlayListName}
                ?${cmdYoutuberLikeMusicPlayListName}
                ?${cmdYoutuberWebSearchPlayListName}
                ?${jsPath.basename("${listDir}")}
        `
|actionImport=
    `${cmdYoutuberCopyToOtherAction}`
|replace=
    COPY_TSV_PATH_TO_TYPE_CON=`${fileList}`,

name=Play
|icon=play
|actionImport=
    `${cmdYoutuberMusicAction}`
|replace=
    TEMP_PLAY_CON=
        `${ITEM_NAME}`
    ?EXTRA_CONTENT=
        `${jsF.r("${cmdYoutuberPlayInfoPath}")} ${jsPath.basename("${ITEM_NAME}")}`
,
