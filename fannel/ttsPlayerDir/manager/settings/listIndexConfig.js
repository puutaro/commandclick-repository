

type=
    tsvEdit,

list=
    listDir=`file://${cmdTtsPlayerManagerListIndexTsvPath}`
    |onOnlyExistPath=ON,

name=
    removeExtend=
    |length=50,


click=
    jsPath=CAT,

longClick=
    jsPath=MENU
    |args=
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
            !tsvValue=${cmdTtsPlayerPreviousTtsPlayListPath}
        |disableDeleteConfirm=ON
        |onDeleteConFile=OFF`,