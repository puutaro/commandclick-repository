
name=Delete
|icon=cancel
|func=SIMPLE_DELETE
,

name=Rename
|icon=edit
|func=RENAME
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
    ?args=
        tsvPath=`${playTsvPath}`
    |var=runExitJudge
        ?when="!tempPlayCon"
        ?func=jsToast.short
        ?args=
            msg="No exist play con"
        ?func=exitZero
|acVar=runCurRecPlay
    ?importPath=`${cmdMusicPlayerMusicAction}`
    ?replace=
        TEMP_PLAY_CON=`${tempPlayCon}`
        &EXTRA_CONTENT=`${playTsvRawName}`,
