
name=Delete
|icon=cancel
|func=SIMPLE_DELETE
,

name=Play
|icon=play
|var=itemName
    ?func=jsPath.basename
    ?args=path="${ITEM_NAME}"
    ?func=jsPath.trimAllExtend
    ?args=path=`${itemName}`
|var=tempPlayCon
    ?func=jsTsv.getSr
    ?args=tsvPath=`${cmdYoutuberPlayListTableDirPath}/${ITEM_NAME}`
|actionImport=`${cmdYoutuberMusicAction}`
|replace=
    TEMP_PLAY_CON=`${tempPlayCon}`
    ?EXTRA_CONTENT=`${itemName}`,
