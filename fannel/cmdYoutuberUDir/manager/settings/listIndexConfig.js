
type=
    tsvEdit,

list=
    listDir=`file://${cmdYoutuberManagerListIndexTsvPath}`
    |sortType=lastUpdate,

name=
    removeExtend=
    |length=50,

click=
    actionImport=
        `${cmdYoutuberManagerFromPlayActionPath}`,

longClick=
    jsPath=MENU
        ?args=
            menuPath=`${cmdYoutuberManagerLongPressListIndexMenuPath}`,

searchBox=
    visible=OFF,

delete=
    disableDeleteConfirm=OFF
    |onDeleteConFile=OFF
    |alter=`
        shellIfPath=JUDGE_LIST_DIR
        |ifArgs=
            tsvPath=${cmdYoutuberManagerListIndexTsvPath}
            ?tsvValue=${cmdYoutuberPreviousMusicPlayListPath}
        |disableDeleteConfirm=ON
        |shellIfPath=JUDGE_LIST_DIR
        |ifArgs=
            tsvPath=${cmdYoutuberManagerListIndexTsvPath}
            ?tsvValue=${cmdYoutuberLikeMusicPlayListPath}
        |disableDeleteConfirm=ON`,