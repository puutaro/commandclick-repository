
name=Delete
|icon=cancel
|jsPath=SIMPLE_DELETE
,

name=Play
|icon=play
|js=
    var=itemName
    ?func=jsPath.trimAllExtend
    ?args=
        path=`${jsPath.basename("${ITEM_NAME}")}`
|actionImport=`${cmdTtsPlayerTtsAction}`
|replace=
    TEMP_PLAY_CON=
        `${jsTsv.getSr(
            "${INDEX_LIST_DIR_PATH}/${ITEM_NAME}"
        )}`
    ?EXTRA_CONTENT=`${itemName}`,
