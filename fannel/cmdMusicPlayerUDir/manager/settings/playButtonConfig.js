

// icon=menu,
visible=ON,
disable=OFF,
color=darkGreen,

click=
    tsvVars="listDir => playTsvPath"
        ?importPath=
            `${cmdMusicPlayerManagerListIndexTsvPath}`
    |var=tempPlayCon
        ?func=jsTsv.getSr
        ?args=
            path=`${playTsvPath}`
        |var=runExitJudge
            ?when="!tempPlayCon"
            ?func=jsToast.short
            ?args=
                msg="No exist play con"
            ?func=exitZero
    |var=extraContent
        ?func=jsFileSystem.read
        ?args=
            path=`${cmdMusicPlayerPlayInfoPath}`
    |acVar=runPlay
        ?importPath=
            `${cmdMusicPlayerMusicAction}`
        ?replace=
            TEMP_PLAY_CON=`${tempPlayCon}`
            &EXTRA_CONTENT=`${extraContent}`
     ,
