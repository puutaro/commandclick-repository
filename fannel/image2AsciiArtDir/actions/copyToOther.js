
var=asciiDirPath
    ?value=`{{ CURRENT_ASCII_DIR_PATH }}`

|acVar=copyDestiAsciiDirNameListCon
    ?importPath=
        `${image2AsciiArtCopyToOtherAcLibs}/makeCopyDestiAsciiDirNameListCon.js`
    ?replace=
        IN_ASCII_DIR_PATH=`${asciiDirPath}`
    |var=runExitJudge
        ?when=`!copyDestiAsciiDirNameListCon`
        ?func=jsToast.short
        ?args=
            msg="No exist dirs"
        ?func=exitZero

|var=copyDestiAsciiDirPath
    ?func=jsDialog.listDialog
    ?args=
        title="Select copy to dir"
        &msg=
        &listSrc=NO_QUOTE:copyDestiAsciiDirNameListCon
    ?if=`!it`
    ?func=exitZero
    ?value=`${image2AsciiArtGalleryDirPath}/${it}`

|acVar=runCopyToOtherList
    ?importPath=
        `${image2AsciiArtCopyToOtherAcLibs}/copyImage.js`
    ?replace=
        ITEM_NAME=`${ITEM_NAME}`
        &IN_ASCII_DIR_PATH=`${asciiDirPath}`
        &IN_COPY_DESTI_ASCII_DIR_PATH=`${copyDestiAsciiDirPath}`
