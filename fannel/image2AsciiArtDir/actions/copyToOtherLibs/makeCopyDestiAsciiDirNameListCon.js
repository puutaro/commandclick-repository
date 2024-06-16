
|var=asciiDirName
    ?func=jsPath.basename
    ?args=
        path="{{ IN_ASCII_DIR_PATH }}"
|var=copyDestiAsciiDirNameListCon
    ?func=jsFileSystem.showDirList
    ?args=
        dirPath=`${image2AsciiArtGalleryDirPath}`
    ?func=jsToListFilter.filter
    ?args=
        lines=`${it}`
        &separator="\n"
        &matchLines=""
        &extraMapCon=`
            removeRegex1="^[ \t]+"
            |removeRegex2="[ \t]+$"
            |matchRegex1=${asciiDirName}
            |matchRegexMatchType=deny
            `
    ?func=jsToListMap.map
    ?args=
        lines=`${it}`
        &separator="\n"
        &extraMapCon=`
            removeRegex1="^[ \t]+"
            |removeRegex2="[ \t]+$"
        `
    ?varReturn="${it}"