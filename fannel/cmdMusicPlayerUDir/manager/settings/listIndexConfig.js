
type=
    tsvEdit,

list=
    listDir=`file://${cmdMusicPlayerManagerListIndexTsvPath}`
    |sortType=sort
    |onOnlyExistPath=ON
    |suffix=`${M4A_SUFFIX}&${MP3_SUFFIX}`,

name=
    removeExtend=
    |length=50,

click=
    acVar=runFromPlay
        ?importPath=
            `${cmdMusicPlayerManagerFromPlayActionPath}`,

longClick=
    func=MENU
    ?args=
        menuPath=`${cmdMusicPlayerManagerLongPressListIndexMenuPath}`,

searchBox=
    visible=OFF,

delete=
    disableDeleteConfirm=OFF
    |onDeleteConFile=OFF
    |alter=`
        shellIfPath=JUDGE_LIST_DIR
        |ifArgs=
            tsvPath=${cmdMusicPlayerManagerListIndexTsvPath}
            ?tsvValue=${cmdMusicPlayerPreviousMusicPlayListPath}
            ?alterCon="|disableDeleteConfirm=ON"
        `,