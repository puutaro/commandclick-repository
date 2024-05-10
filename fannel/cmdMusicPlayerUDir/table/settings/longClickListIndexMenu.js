
name=Delete
|icon=cancel
|func=SIMPLE_DELETE
,

name=Play
|icon=play
|var=playTsvRawName
    ?func=jsPath.basename
    ?args=
        playTsvPath="${ITEM_NAME}"
    ?func=jsPath.trimAllExtend
    ?args=
        path=`${playTsvRawName}`
|var=playTsvPath
    ?value=`${ITEM_NAME}`
|var=tempPlayCon
    ?func=jsTsv.getSr
    ?args=tsvPath=`${playTsvPath}`
    ?exitJudge="!tempPlayCon"
    ?exitToast="No exist play con"
|actionImport=`${cmdMusicPlayerMusicAction}`
|replace=
    TEMP_PLAY_CON=`${tempPlayCon}`
    ?EXTRA_CONTENT=`${playTsvRawName}`,
