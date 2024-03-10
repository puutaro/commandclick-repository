// js/action

tsvImport=`${cmdTtsPlayerManagerListIndexTsvPath}`
|js=
    if=`!listDir`
    !func=
        con:`var listDir = "${cmdTtsPlayerPlayListPath}"`
|actionImport=`${cmdTtsPlayerTtsAction}`
|replace=
    TEMP_PLAY_CON="${jsTsv.getSr(`${listDir}`)}"
    !EXTRA_CONTENT=`
        ${jsF.r("${cmdTtsPlayerPlayInfoPath}")}`,