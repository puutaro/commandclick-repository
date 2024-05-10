

// icon=menu,
visible=ON,
disable=OFF,
color=darkGreen,

click=
    |tsvImport=`${image2AsciiArtAsciiListIndexTsvPath}`
        ?use=`listDir => asciiDirPathForAsciiPlay`
    |var=imageNameList
        ?func=jsFileSystem.showFullFileList
        ?args=
            dirPath=`${asciiDirPathForAsciiPlay}`
            &extraMapCon=`
                suffix=".jpeg?.png"
                |onOutputAsName=ON
                `
        ?method=`split`
        ?methodArgs=
            sepa="\n"
        ?exitJudge=`!imageNameList || imageNameList.length == 0`
        ?exitToast=`imageNameList zero: ${imageNameList}`
    |var=rndIndex
        ?func=Math.floor
        ?args=
            rndFloat=NO_QUOTE:Math.random() * imageNameList.length
    |var=imageName
        ?func=imageNameList.at
        ?args=
            index=NO_QUOTE:rndIndex
    |actionImport=
        `${image2AsciiArtQuizAction}`
    |replace=
        IMAGE_NAME=`${imageName}`
     ,
