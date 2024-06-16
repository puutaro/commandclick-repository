
var=onListDirUpdater
    ?value=`{{ ON_LIST_DIR_UPDATER:OFF }}`
|var=updateListDirPath
    ?value=
    ?if=`onListDirUpdater == "ON"`
    ?value=`{{ LIST_DIR_OR_TSV_PATH:${ITEM_NAME} }}`
|var=extraMapCon
    ?value=`
        onListDirUpdater=${onListDirUpdater}
        |listDirTsvPath={{ TSV_PATH:${image2AsciiArtAsciiListIndexTsvPath} }}
        |listDirValue=${updateListDirPath}
        |onInfoSave={{ ON_INFO_SAVE:OFF }}
        |saveInfoPath=${image2AsciiArtPlayInfoPath}
        |extraSaveInfo={{ EXTRA_SAVE_INFO:: }}
        `
|var=runChangeState
    ?func=jsStateChange.change_S
    ?args=
        stateName="{{ STATE }}"
        &extraMapCon=`${extraMapCon}`
,
