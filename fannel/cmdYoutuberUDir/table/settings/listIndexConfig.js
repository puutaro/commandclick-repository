
type=
    tsvEdit,

list=
    listDir=`${cmdYoutuberTableTsvPath}`
    |sortType=lastUpdate
    |compPath=`${cmdYoutuberTableInitTsvConPath}`
    |prefix=`${TUBE_PREFIX}`
    |suffix=`${TSV_SUFFIX}`
    ,

name=
    removeExtend=,

click=
    enableUpdate=ON
    |var=state
        ?value=`${MANAGER}`
        ?if=`"${ITEM_NAME}" == '${cmdYoutuberWebSearchPlayListName}'`
        ?value=`${SEARCHER}`
    |actionImport=
        `${cmdYoutuberChangeStateAction}`
    |replace=
        STATE=`${state}`
        ?ON_LIST_DIR_UPDATER=ON
        ?ON_PLAY_INFO_SAVE=ON,

longClick=
    func=MENU
        ?args=
            menuPath=
                `${cmdYoutuberTableLongPressListIndexMenuPath}`,

searchBox=
    visible=OFF,
