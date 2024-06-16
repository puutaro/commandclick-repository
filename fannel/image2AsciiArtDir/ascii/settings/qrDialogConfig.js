
mode=
    normal,

logo=
    oneSideLength=150
    |icon=
        name=imagePath
        ?bkColor=white
    ,

click=
    acVar=runQuiz
        ?importPath=
            `${image2AsciiArtQuizAction}`
        ?replace=
            IMAGE_NAME=`${ITEM_NAME}`,

longClick=
    tsvVars='listDir => curAsciiStateListDirPath'
        ?importPath=`${image2AsciiArtAsciiListIndexTsvPath}`
    |acVar=runCopyToOtherList
        ?importPath=
            `${image2AsciiArtCopyToOtherAction}`
        ?replace=
            CURRENT_ASCII_DIR_PATH=`${curAsciiStateListDirPath}`,