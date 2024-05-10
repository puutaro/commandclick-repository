
type=
    normal,

layout=
    type=grid
    |col=2,

list=
    listDir=`file://${image2AsciiArtImageListIndexTsvPath}`
    |onOnlyExistPath=ON,

name=
    |onHide=
    |removeExtend=
    |length=50,

click=
    actionImport=
        `${image2AsciiArtImageFromPlayActionPath}`,

longClick=
    func=MENU
        ?args=
            menuPath=`${image2AsciiArtImageLongPressListIndexMenuPath}`,

searchBox=
    visible=OFF,

delete=
    withJsAction=`
        tsvImport="${image2AsciiArtImageListIndexTsvPath}"
            ?use="listDir => imageDirPath"
        |var=asciiDirPath
            ?func=jsPath.dirname
            ?args=path="${imageDirPath}"
        |actionImport=
            "${image2AsciiArtDeleteWithAction}"
        |replace=
            DELETE_DIR_PATH="${asciiDirPath}"
            ?IMAGE_NAME="${ITEM_NAME}"
    `
    ,