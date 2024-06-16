

|var=imageName
    ?value=`{{ ITEM_NAME }}`
|var=asciiDirPath
    ?value=`{{ IN_ASCII_DIR_PATH }}`
|var=copyDestiAsciiDirPath
   ?value=`{{ IN_COPY_DESTI_ASCII_DIR_PATH }}`

|var=runCopyImageToDestiDir
    ?func=jsFileSystem.copyFile
    ?args=
        srcPath=`${asciiDirPath}/${imageName}`
        &destiPath=`{{ IN_COPY_DESTI_ASCII_DIR_PATH }}/${imageName}`

|var=imageDirPath
    ?value=`${asciiDirPath}/${imageDirName}`
|var=copyDestiImageDirPath
    ?value=`${copyDestiAsciiDirPath}/${imageDirName}`
|var=runCopyAsciiToDestiDir
    ?func=jsFileSystem.copyFile
    ?args=
        srcPath=`${imageDirPath}/${imageName}`
        &destiPath=`${copyDestiImageDirPath}/${imageName}`
|var=runAllCopyOkMsg
    ?func=jsToast.short
    ?args=
        msg="copy ok"
,