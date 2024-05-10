

// icon=menu,
visible=ON,
disable=OFF,
color=darkGreen,

click=
    tsvImport=
        `${cmdMusicPlayerManagerListIndexTsvPath}`
        ?use="listDir => playTsvPath"
    |var=tempPlayCon
        ?func=jsTsv.getSr
        ?args=
            path=`${playTsvPath}`
        ?exitJudge="!tempPlayCon"
        ?exitToast="No exist play con"
    |var=extraContent
        ?func=jsFileSystem.read
        ?args=
            path=`${cmdMusicPlayerPlayInfoPath}`
    |actionImport=
            `${cmdMusicPlayerMusicAction}`
    |replace=
        TEMP_PLAY_CON=`${tempPlayCon}`
        ?EXTRA_CONTENT=`${extraContent}`
     ,
