
type=
    normal,

layout=
    type=grid
    |col=2,

list=
    listDir=`file://${image2AsciiArtAsciiListIndexTsvPath}`
    |onOnlyExistPath=ON,

name=
    |onHide=
    |removeExtend=
    |length=50,

click=
    ,

longClick=
    func=MENU
        ?args=
            menuPath=`${image2AsciiArtAsciiLongPressListIndexMenuPath}`,

searchBox=
    visible=OFF,

delete=
    withJsAction=`
        tsvImport="${image2AsciiArtAsciiListIndexTsvPath}"
            ?use="listDir => asciiDirPath"
        |var=imageDirPath
            ?value="${asciiDirPath}/${imageDirName}"
        |actionImport=
            "${image2AsciiArtDeleteWithAction}"
        |replace=
            DELETE_DIR_PATH="${imageDirPath}"
            ?IMAGE_NAME="${ITEM_NAME}"
    `,
