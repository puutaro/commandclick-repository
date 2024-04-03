

// icon=menu,
visible=ON,
disable=OFF,
color=darkGreen,

click=
    tsvImport=
        `${cmdTtsPlayerManagerListIndexTsvPath}`
    |actionImport=
            `${cmdTtsPlayerTtsAction}`
    |replace=
        TEMP_PLAY_CON=
            `${jsTsv.getSr("${listDir}")}`
        ?EXTRA_CONTENT=`
            ${jsF.r("${cmdTtsPlayerPlayInfoPath}")}`
     ,
