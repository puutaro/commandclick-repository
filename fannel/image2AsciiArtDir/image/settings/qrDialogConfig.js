
mode=
    normal,

logo=
    oneSideLength=150
    |icon=
        name=imagePath
        ?color=yellow,

click=
    tsvVars="listDir => imageDirPathForLook"
        ?importPath=`${image2AsciiArtImageListIndexTsvPath}`
    |var=runImageViewer
        ?func=jsDialog.imageDialog
        ?args=
            msg="Image viewer"
            &path=`${imageDirPathForLook}/${ITEM_NAME}`
            &imageDialogMapCon=`hideButtons=ok`
,

longClick=
    tsvVars="listDir => curImageStateListDirPath"
        ?importPath=`${image2AsciiArtImageListIndexTsvPath}`
    |var=curAsciiStateListDirPath
        ?value=NO_QUOTE:jsPath.dirname("${curImageStateListDirPath}")
    |acVar=runCopyToOtherList
        ?importPath=
            `${image2AsciiArtCopyToOtherAction}`
        ?replace=
            CURRENT_ASCII_DIR_PATH=`${curAsciiStateListDirPath}`,
