// js/action

var=tempPlayCon
    ?func=jsTsv.getSr
    ?args=tsvPath=`${cmdTtsPlayerPlayListPath}`
    |var=runExitJudge
        ?when="!tempPlayCon"
        ?func=jsToast.short
        ?args=
            msg="Not exist contents"
        ?func=exitZero
|var=extaraContent
    ?func=jsFileSystem.read
    ?args=path=`${cmdTtsPlayerPlayInfoPath}`
|acVar=runPlay
    ?importPath=`${cmdTtsPlayerTtsAction}`
    ?replace=
        TEMP_PLAY_CON= `${tempPlayCon}`
        &EXTRA_CONTENT=`${extaraContent}`,
