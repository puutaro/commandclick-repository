
type=
    tsvEdit,

list=
    listDir=`file://${cmdTtsPlayerManagerListIndexTsvPath}`
    |onOnlyExistPath=ON,

name=
    removeExtend=
    |length=50,

click=
    acVar=runFromPlay
        ?importPath=
            `${cmdTtsPlayerManagerFromPlayActionPath}`,

longClick=
    func=MENU
        ?args=
            menuPath=`${cmdTtsPlayerManagerLongPressListIndexMenuPath}`,

searchBox=
    visible=OFF,

delete=
    disableDeleteConfirm=OFF
    |onDeleteConFile=ON
    |alter=`
        shellIfPath=JUDGE_LIST_DIR
        |ifArgs=
            tsvPath=${cmdTtsPlayerManagerListIndexTsvPath}
            ?tsvValue=${cmdTtsPlayerPreviousTtsPlayListPath}
            ?alterCon="
                    |disableDeleteConfirm=ON
                    |onDeleteConFile=OFF
                "
        `
        ,