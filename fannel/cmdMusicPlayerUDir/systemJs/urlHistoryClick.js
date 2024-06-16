// js/action

var=tempPlayCon
    ?func=jsTsv.getSr
    ?args=tsvPath=`${cmdMusicPlayerPlayListPath}`
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
        &EXTRA_CONTENT=`${extraContent}`,