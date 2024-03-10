
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
