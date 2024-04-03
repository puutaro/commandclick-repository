
tsvImport=
    `${cmdMusicPlayerManagerListIndexTsvPath}`
|jsCon=
    `var playInfo =
        jsF.r("${cmdMusicPlayerPlayInfoPath}")`
|jsCon=
    `var trackName =
        jsPath.basename("${ITEM_NAME}")`
|actionImport=
    `${cmdMusicPlayerMusicAction}`
|replace=
    PLAY_MODE=ordinaly
    ?TEMP_PLAY_CON=
        `${jsTsv.getSrFromThis("${listDir}", "${ITEM_NAME}")}`
    ?EXTRA_CONTENT=
        `${playInfo} from ${trackName}`,