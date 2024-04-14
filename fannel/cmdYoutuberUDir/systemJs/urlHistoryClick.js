// js/action

tsvImport=
    `${cmdYoutuberManagerListIndexTsvPath}`
|var=listDir
    ?value="${cmdYoutuberPlayListPath}"
|actionImport=
    `${cmdYoutuberMusicAction}`
|replace=
    TEMP_PLAY_CON=
        "${jsTsv.getSr(`${listDir}`)}"
    ?EXTRA_CONTENT=`
        ${jsF.r("${cmdYoutuberPlayInfoPath}")}`,