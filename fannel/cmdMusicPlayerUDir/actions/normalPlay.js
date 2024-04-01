// js/action

tsvImport=
    `${cmdMusicPlayerManagerListIndexTsvPath}`
|actionImport=
    `${cmdMusicPlayerMusicAction}`
|replace=
    TEMP_PLAY_CON=
        `${jsTsv.getSr("${listDir}")}`
    !EXTRA_CONTENT=
        `${jsF.r("${cmdMusicPlayerPlayInfoPath}")}`
        ,
