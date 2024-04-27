
mode=tsvEdit,
logo=
    oneSideLength=40
    |icon=
        name=star
        ?color=yellow,

click=
    actionImport=
        `${cmdYoutuberCopyToOtherAction}`
    |replace=
        COPY_TSV_PATH_TO_TYPE_CON=`${cmdYoutuberLikeMusicPlayListPath}`
    |alter=`
        shellIfPath=JUDGE_LIST_DIR
        |ifArgs=
            tsvPath=${cmdYoutuberManagerListIndexTsvPath}
            ?tsvValue=${cmdYoutuberLikeMusicPlayListPath}
        |actionImport=`,
