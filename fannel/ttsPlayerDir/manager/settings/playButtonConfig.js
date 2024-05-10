

// icon=menu,
visible=ON,
disable=OFF,
color=darkGreen,

click=
    tsvImport=
        `${cmdTtsPlayerManagerListIndexTsvPath}`
        ?use="listDir"
    |var=tempPlayCon
        ?func=jsTsv.getSr
        ?args=
            tsvPath="${listDir}"
    |var=extraContent
        ?func=jsFileSystem.read
        ?args=
            path="${cmdTtsPlayerPlayInfoPath}"
    |actionImport=
            `${cmdTtsPlayerTtsAction}`
    |replace=
        TEMP_PLAY_CON=
            `${tempPlayCon}`
        ?EXTRA_CONTENT=`
            ${extraContent}`
     ,
