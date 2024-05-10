// js/action

var=tempPlayCon
    ?func=jsTsv.getSr
    ?args=tsvPath=`${cmdTtsPlayerPlayListPath}`
    ?exitJudge="!tempPlayCon"
    ?exitToast="contents not exist"
|var=extaraContent
    ?func=jsFileSystem.read
    ?args=path=`${cmdTtsPlayerPlayInfoPath}`
|actionImport= `${cmdTtsPlayerTtsAction}`
|replace=
    TEMP_PLAY_CON= `${tempPlayCon}`
    ?EXTRA_CONTENT=`${extaraContent}`,
