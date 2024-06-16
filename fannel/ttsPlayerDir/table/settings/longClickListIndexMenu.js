
name=Delete
|icon=cancel
|func=SIMPLE_DELETE
,

name=Play
|icon=play
|var=itemName
    ?func=jsPath.basename
    ?args=
        path="${ITEM_NAME}"
    ?func=jsPath.trimAllExtend
    ?args=
        path=`${itemName}`
|var=tempPlayCon
    ?func=jsTsv.getSr
    ?args=
        path="${INDEX_LIST_DIR_PATH}/${ITEM_NAME}"
|acVar=runCurRecordPlay
    ?importPath=`${cmdTtsPlayerTtsAction}`
    ?replace=
        TEMP_PLAY_CON=`${tempPlayCon}`
        &EXTRA_CONTENT=`${itemName}`,
