

// icon=menu,
visible=ON,
disable=OFF,
color=darkGreen,
caption="playQuiz",

click=
    tsvVars=`listDir => asciiDirPathForAsciiPlay`
        ?importPath=`${image2AsciiArtAsciiListIndexTsvPath}`
    |var=imageNameList
        ?func=jsFileSystem.showFullFileList
        ?args=
            dirPath=`${asciiDirPathForAsciiPlay}`
            &extraMapCon=`
                suffix=".jpeg?.png"
                |onOutputAsName=ON
                `
        ?func=it.split
        ?args=sepa="\n"
        |var=runExitJudge
            ?when=`!imageNameList || imageNameList.length == 0`
            ?func=jsToast.short
            ?args=msg=`imageNameList zero: ${imageNameList}`
            ?func=exitZero
    |var=rndIndex
        ?func=Math.floor
        ?args=
            rndFloat=NO_QUOTE:Math.random() * imageNameList.length
    |var=imageName
        ?func=imageNameList.at
        ?args=
            index=NO_QUOTE:rndIndex
    |acVar=runQuiz
        ?importPath=
            `${image2AsciiArtQuizAction}`
        ?replace=
            IMAGE_NAME=`${imageName}`
     ,
