

// icon=menu,
visible=ON,
disable=OFF,
color=darkGreen,

click=
    tsvImport=
        `${cmdMusicPlayerManagerListIndexTsvPath}`
    |actionImport=
            `${cmdMusicPlayerMusicAction}`
    |replace=
        TEMP_PLAY_CON=
            `${jsTsv.getSr("${listDir}")}`
        !EXTRA_CONTENT=`
            ${jsF.r("${cmdMusicPlayerPlayInfoPath}")}`
     ,
