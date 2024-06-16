
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

click=,

longClick=,

searchBox=
    visible=OFF,

delete=
    withJsAction=`
        tsvVars="listDir => asciiDirPath"
            ?importPath="${image2AsciiArtAsciiListIndexTsvPath}"
        |var=imageDirPath
            ?value="${asciiDirPath}/${imageDirName}"
        |acVar=runDeleteImage
            ?importPath=
                "${image2AsciiArtDeleteWithAction}"
            ?replace=
                DELETE_DIR_PATH="${imageDirPath}"
                &IMAGE_NAME="${ITEM_NAME}"
    `,
