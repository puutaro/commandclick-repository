
type=
    tsvEdit,

list=
    listDir=`${image2AsciiArtTableTsvPath}`
    |compPath=`${image2AsciiArtTableInitTsvConPath}`
    ,

// name=,

click=
    enableUpdate=ON
    |actionImport=
        `${image2AsciiArtChangeStateAction}`
    |replace=
        STATE=`${ASCII}`
        ?ON_LIST_DIR_UPDATER=ON
        ?ON_INFO_SAVE=ON,

longClick=
    |func=MENU
        ?args=
            menuPath=
                `${image2AsciiArtTableLongPressListIndexMenuPath}`,

searchBox=
    visible=OFF,
