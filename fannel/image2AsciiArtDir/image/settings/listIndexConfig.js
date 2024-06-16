
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

click=,

longClick=,

searchBox=
    visible=OFF,

delete=
    withJsAction=`
        tsvVars="listDir => imageDirPath"
            ?importPath="${image2AsciiArtImageListIndexTsvPath}"
        |var=asciiDirPath
            ?func=jsPath.dirname
            ?args=path="${imageDirPath}"
        |acVar=runDeleteAscii
            ?importPath=
                "${image2AsciiArtDeleteWithAction}"
            ?replace=
                DELETE_DIR_PATH="${asciiDirPath}"
                &IMAGE_NAME="${ITEM_NAME}"
    `
    ,