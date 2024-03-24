
list=
    listDir=`${cmdMusicPlayerPlayListTableDirPath}`
    |compPath=`${cmdMusicPlayerTableInitTsvConPath}`
    |prefix=`${MUSIC_PREFIX}`
    |suffix=`${TSV_SUFFIX}`
    ,

name=
    removeExtend=,

click=
    enableUpdate=ON
    |actionImport=
        `${cmdMusicPlayerChangeStateAction}`
    |replace=
        STATE=`${MANAGER}`
        !ON_LIST_DIR_UPDATER=true
        !ON_PLAY_INFO_SAVE=true,

longClick=
    |jsPath=MENU
    |args=
        menuPath=
            `${cmdMusicPlayerTableLongPressListIndexMenuPath}`,

searchBox=
    visible=OFF,
