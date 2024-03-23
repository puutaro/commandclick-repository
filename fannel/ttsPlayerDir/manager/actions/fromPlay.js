
tsvImport=
    `${cmdTtsPlayerManagerListIndexTsvPath}`
|jsCon=
    `var playInfo = 
        jsF.r("${cmdTtsPlayerPlayInfoPath}")`
|jsCon=
    `var trackName = 
        jsPath.basename("${ITEM_NAME}")`
|actionImport=
    `${cmdTtsPlayerTtsAction}`
|replace=
    PLAY_MODE=ordinaly
    !TEMP_PLAY_CON=
        `${jsTsv.getSrFromThis("${listDir}", "${ITEM_NAME}")}`
    !EXTRA_CONTENT=
        `${playInfo} from ${trackName}`