
tsvImport=`${image2AsciiArtAsciiListIndexTsvPath}`
    ?use=
        "listDir => asciiDirPathForQuiz"
|var=asciiDirPath
    ?value=`${asciiDirPathForQuiz}`
|var=isOk
    ?func=jsDialog.imageDialog
    ?args=
        msg="What's image ?"
        &path=`${asciiDirPath}/{{ IMAGE_NAME }}`
        &imageDialogMapCon=
    ?exitJudge=`!isOk`
|var=imageDirPath
    ?value=`${asciiDirPath}/${imageDirName}`
|func=jsDialog.imageDialog
    ?args=
        msg="Answer"
        &path=`${imageDirPath}/{{ IMAGE_NAME }}`
        &imageDialogMapCon=`hideButtons=ok`
,

