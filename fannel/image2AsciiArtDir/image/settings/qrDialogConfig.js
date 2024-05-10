
mode=
    normal,

logo=
    oneSideLength=150
    |icon=
        name=imagePath
        ?color=yellow,

click=
    tsvImport=`${image2AsciiArtImageListIndexTsvPath}`
        ?use=
            "listDir => imageDirPathForLook"
    |func=jsDialog.imageDialog
        ?args=
            msg="Image viewer"
            &path=`${imageDirPathForLook}/${ITEM_NAME}`
            &imageDialogMapCon=`hideButtons=ok`
,

longClick=
    tsvImport=`${image2AsciiArtImageListIndexTsvPath}`
        ?use="listDir => curImageStateListDirPath"
    |var=curAsciiStateListDirPath
        ?value=NO_QUOTE:jsPath.dirname("${curImageStateListDirPath}")
    |actionImport=
        `${image2AsciiArtCopyToOtherAction}`
    |replace=
        CURRENT_ASCII_DIR_PATH=`${curAsciiStateListDirPath}`,
