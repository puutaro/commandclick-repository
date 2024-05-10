
tsvImport=
    `${cmdTtsPlayerManagerListIndexTsvPath}`
    ?use="listDir => tsvListPath"
|var=playInfo
    ?func=jsFileSystem.read
    ?args=
        path=`${cmdTtsPlayerPlayInfoPath}`
|var=trackName
    ?func=jsPath.basename
    ?args=
        path="${ITEM_NAME}"
|var=tempPlayCon
    ?func=jsTsv.getSrFromThis
    ?args=
        path="${tsvListPath}"
        &firstLine=`${ITEM_NAME}`
|actionImport=
    `${cmdTtsPlayerTtsAction}`
|replace=
    PLAY_MODE=ordinaly
    ?TEMP_PLAY_CON=
        `${tempPlayCon}`
    ?EXTRA_CONTENT=
        `${playInfo} from ${trackName}`