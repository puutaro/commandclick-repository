

list=
    listDir=`${cmdTtsPlayerPlayListTableDirPath}`
    |compPath=`${cmdTtsPlayerTableInitTsvConPath}`
    |prefix=`${TTS_PREFIX}`
    |suffix=`${TSV_SUFFIX}`
    ,

name=
    removeExtend=,


click=
    actionImport=`${cmdTtsPlayerChangeStateAction}`
    |replace=
        STATE=`${MANAGER}`
        !ON_LIST_DIR_UPDATER=true
        !ON_PLAY_INFO_SAVE=true,
longClick=
    |jsPath=MENU
    |args=
        menuPath=`${cmdTtsPlayerTableLongPressListIndexMenuPath}`,

searchBox=
    visible=OFF,