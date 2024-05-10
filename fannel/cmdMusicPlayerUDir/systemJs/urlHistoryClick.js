// js/action

var=tempPlayCon
    ?func=jsTsv.getSr
    ?args=tsvPath=`${cmdMusicPlayerPlayListPath}`
    ?exitJudge=`!tempPlayCon`
    ?exitToast=`not exist play contents`
|var=extraContent
    ?func=jsFileSystem.read
    ?args=path=`${cmdMusicPlayerPlayInfoPath}`
|actionImport=
    `${cmdMusicPlayerMusicAction}`
|replace=
    TEMP_PLAY_CON=`${tempPlayCon}`
    ?EXTRA_CONTENT=`${extraContent}`,