// js/action

tsvImport=
    `${cmdYoutuberManagerListIndexTsvPath}`
|actionImport=
    `${cmdYoutuberMusicAction}`
|replace=
    TEMP_PLAY_CON=
        `${jsTsv.getSr("${listDir}")}`
    ?EXTRA_CONTENT=
        `${jsF.r("${cmdYoutuberPlayInfoPath}")}`
        ,
