

var=onListDirUpdater
    ?value=`"{{ ON_LIST_DIR_UPDATER:OFF }}"`
|var=updatePlayListTsvPath
    ?value=
    ?if=`onListDirUpdater == "ON"`
    ?value=`${ITEM_NAME}`
|var=extraMapCon
    ?value=`
        onListDirUpdater=${onListDirUpdater}
        |listDirTsvPath=${cmdMusicPlayerManagerListIndexTsvPath}
        |listDirValue=${updatePlayListTsvPath}
        |onInfoSave={{ ON_PLAY_INFO_SAVE:OFF }}
        |saveInfoPath=${cmdMusicPlayerPlayInfoPath}
        |extraSaveInfo=
        |enableAddToBackStack={{ ENABLE_ADD_TO_BACKSTACK:OFF }}
        `
|func=jsStateChange.change_S
    ?args=
        stateName="{{ STATE }}"
        &extraMapCon=`${extraMapCon}`
    ,
