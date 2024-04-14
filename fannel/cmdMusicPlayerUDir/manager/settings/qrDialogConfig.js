
mode=tsvEdit,

logo=
    oneSideLength=40
    |icon=
        name=star
        ?bkColor=darkGreen
        ?color=ligthOrange,

click=
    actionImport=
        `${cmdMusicPlayerCopyToOtherAction}`
    |replace=
        COPY_TSV_PATH_TO_TYPE_CON=`${cmdMusicPlayerLikePlayListPath}`
    |alter=`
        shellIfPath=JUDGE_LIST_DIR
        |ifArgs=
            tsvPath=${cmdMusicPlayerManagerListIndexTsvPath}
            ?tsvValue=${cmdMusicPlayerLikePlayListPath}
        |actionImport=`,
