
tsvVars="listDir => curAsciiStateListDirPath"
    ?importPath=`${image2AsciiArtAsciiListIndexTsvPath}`

|var=varAsciiStateListDirPath
    ?value=`${varAsciiStateListDirPathArg}`
|var=imageStateListDir
    ?value=`${varAsciiStateListDirPath}/${imageDirName}`
|var=downloadImagePath
    ?func=jsCurl.getImage
    ?args=
        &url=`{{ LONG_PRESS_IMAGE_URL }}`
|var=downloadImageName
    ?func=jsPath.basename
    ?args=
        path=NO_QUOTE:downloadImagePath
|var=destiImagePath
    ?value=`${imageStateListDir}/${downloadImageName}`
|var=runCopyDownloadImage
    ?func=jsFileSystem.copyFile
    ?args=
        srcPath=`NO_QUOTE:downloadImagePath`
        &destiPath=`${destiImagePath}`
|var=runAsiiDialogAndSave
    ?func=jsDialog.asciiArtDialog
    ?args=
        &title="Ascii image"
        &imagePath=`${destiImagePath}`
        &asciiArtMapCon=`
            savePath=${varAsciiStateListDirPath}/${downloadImageName}
            |hideButtons=cancel
        `
