

// icon=menu,
visible=ON,
disable=OFF,
color=darkGreen,

click=
    tsvVars="listDir"
        ?importPath=
            `${cmdTtsPlayerManagerListIndexTsvPath}`
    |var=tempPlayCon
        ?func=jsTsv.getSr
        ?args=
            tsvPath="${listDir}"
    |var=extraContent
        ?func=jsFileSystem.read
        ?args=
            path="${cmdTtsPlayerPlayInfoPath}"
    |acVar=runPlay
        ?importPath=
            `${cmdTtsPlayerTtsAction}`
        ?replace=
            TEMP_PLAY_CON=
                `${tempPlayCon}`
            &EXTRA_CONTENT=`
                ${extraContent}`
     ,
