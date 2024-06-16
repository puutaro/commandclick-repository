

var=onListDirUpdater
    ?value=`"{{ ON_LIST_DIR_UPDATER:OFF }}"`
|var=updatePlayListTsvPath
    ?value=
    ?if=`onListDirUpdater == "ON"`
    ?value=`${ITEM_NAME}`
|var=extraMapCon
    ?value=`
        onListDirUpdater=${onListDirUpdater}
        |listDirTsvPath=${cmdTtsPlayerManagerListIndexTsvPath}
        |listDirValue=${updatePlayListTsvPath}
        |onInfoSave={{ ON_PLAY_INFO_SAVE:OFF }}
        |saveInfoPath=${cmdTtsPlayerPlayInfoPath}
        |extraSaveInfo=
        |enableAddToBackStack={{ ENABLE_ADD_TO_BACKSTACK:OFF }}
        `
|var=runChangeSate
    ?func=jsStateChange.change_S
    ?args=
        stateName="{{ STATE }}"
        &extraMapCon=`${extraMapCon}`
    ,
