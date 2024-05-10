
type=
    tsvEdit,

list=
    listDir=`${cmdMusicPlayerTableTsvPath}`
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
        ?ON_LIST_DIR_UPDATER=ON
        ?ON_PLAY_INFO_SAVE=ON,

longClick=
    |func=MENU
    ?args=
        menuPath=
            `${cmdMusicPlayerTableLongPressListIndexMenuPath}`,

searchBox=
    visible=OFF,
