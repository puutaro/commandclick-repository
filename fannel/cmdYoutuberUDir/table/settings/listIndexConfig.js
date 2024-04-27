
type=
    tsvEdit,

list=
    listDir=`${cmdYoutuberTableTsvPath}`
    // listDir=`${cmdYoutuberPlayListTableDirPath}`
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
        ?value="${MANAGER}"
    |js=
        if=`"${ITEM_NAME}" == "${cmdYoutuberWebSearchPlayListName}"`
        ?func=con:`state = "${SEARCHER}"`
    |actionImport=
        `${cmdYoutuberChangeStateAction}`
    |replace=
        STATE=`${state}`
        ?ON_LIST_DIR_UPDATER=true
        ?ON_PLAY_INFO_SAVE=true,

longClick=
    jsPath=MENU
        ?args=
            menuPath=
                `${cmdYoutuberTableLongPressListIndexMenuPath}`,

searchBox=
    visible=OFF,
