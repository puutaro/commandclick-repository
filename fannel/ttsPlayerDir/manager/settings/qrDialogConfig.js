
mode=
    tsvEdit,

logo=
    oneSideLength=40
    |icon=
        name=star
        ?bkColor=navy
        ?color=lightAo,

click=
    acVar=runCopyToLike
        ?importPath=
            `${cmdTtsPlayerCopyToOtherAction}`
        ?replace=
            COPY_TSV_PATH_TO_TYPE_CON=`${cmdTtsPlayerLikePlayListPath}`
    |alter=`
        shellIfPath=JUDGE_LIST_DIR
        |ifArgs=
            tsvPath=${cmdTtsPlayerManagerListIndexTsvPath}
            ?tsvValue=${cmdTtsPlayerLikePlayListPath}
            ?alterCon="?when=false"
            `,