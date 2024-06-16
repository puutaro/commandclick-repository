
type=
    tsvEdit,

list=
    listDir=`${cmdTtsPlayerTableTsvPath}`
    |compPath=`${cmdTtsPlayerTableInitTsvConPath}`
    |prefix=`${TTS_PREFIX}`
    |suffix=`${TSV_SUFFIX}`
    ,

name=
    removeExtend=,

click=
    enableUpdate=ON
    |acVar=runToConfigState
        ?importPath=
            `${cmdTtsPlayerChangeStateAction}`
        ?replace=
            STATE=`${MANAGER}`
            &ON_LIST_DIR_UPDATER=ON
            &ON_PLAY_INFO_SAVE=ON,

longClick=
    |func=MENU
        ?args=
            menuPath=
                `${cmdTtsPlayerTableLongPressListIndexMenuPath}`,

searchBox=
    visible=OFF,
