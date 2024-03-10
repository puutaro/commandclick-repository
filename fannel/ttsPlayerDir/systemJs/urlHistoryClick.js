// js/action

tsvImport=
    `${cmdTtsPlayerManagerListIndexTsvPath}`
|jsCon=
    `var listDir = "${cmdTtsPlayerPlayListPath}"`
|actionImport=
    `${cmdTtsPlayerTtsAction}`
|replace=
    TEMP_PLAY_CON=
        "${jsTsv.getSr(`${listDir}`)}"
    !EXTRA_CONTENT=`
        ${jsF.r("${cmdTtsPlayerPlayInfoPath}")}`,