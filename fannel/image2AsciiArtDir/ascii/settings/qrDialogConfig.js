
mode=
    normal,

logo=
    oneSideLength=150
    |icon=
        name=imagePath
        ?bkColor=white
    ,

click=
    actionImport=
        `${image2AsciiArtQuizAction}`
    |replace=
        IMAGE_NAME=`${ITEM_NAME}`,

longClick=
    tsvImport=`${image2AsciiArtAsciiListIndexTsvPath}`
        ?use='listDir => curAsciiStateListDirPath'
    |actionImport=
        `${image2AsciiArtCopyToOtherAction}`
        |replace=
            CURRENT_ASCII_DIR_PATH=`${curAsciiStateListDirPath}`,