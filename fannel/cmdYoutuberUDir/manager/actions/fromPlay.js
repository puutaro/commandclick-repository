
tsvImport=
    `${cmdYoutuberManagerListIndexTsvPath}`
|var=playInfo
    ?value=`NO_QUOTE:jsF.r("${cmdYoutuberPlayInfoPath}")`
|var=trackName
    ?value=`NO_QUOTE:jsPath.basename("${ITEM_NAME}")`
|actionImport=
    `${cmdYoutuberMusicAction}`
|replace=
    PLAY_MODE=ordinaly
    ?TEMP_PLAY_CON=
        `NO_QUOTE:jsTsv.getSrFromThis("${listDir}", "${ITEM_NAME}")`
    ?EXTRA_CONTENT=
        `${playInfo} from ${trackName}`,