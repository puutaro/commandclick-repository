
type=
    tsvEdit,

list=
    listDir=`file://${cmdYoutuberManagerListIndexTsvPath}`
    |sortType=lastUpdate,

name=
    removeExtend=
    |length=50,

click=
    acVar=runFromPlay
        ?importPath=
            `${cmdYoutuberManagerFromPlayActionPath}`,

longClick=
    func=MENU
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
            ?tsvValue="
                ${cmdYoutuberPreviousMusicPlayListPath}
                &${cmdYoutuberLikeMusicPlayListPath}
            "
            ?alterCon="|disableDeleteConfirm=ON"
        `,