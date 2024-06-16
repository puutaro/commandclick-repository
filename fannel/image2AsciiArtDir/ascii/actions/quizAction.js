
|tsvVars="listDir => asciiDirPathForQuiz"
    ?importPath=`${image2AsciiArtAsciiListIndexTsvPath}`
|var=asciiDirPath
    ?value=`${asciiDirPathForQuiz}`
|var=isOk
    ?func=jsDialog.imageDialog
    ?args=
        msg="What's image ?"
        &path=`${asciiDirPath}/{{ IMAGE_NAME }}`
        &imageDialogMapCon=
    |var=runExitJudge
        ?when=`!isOk`
        ?func=exitZero
|var=imageDirPath
    ?value=`${asciiDirPath}/${imageDirName}`
|var=runImageAnswerDialog
    ?func=jsDialog.imageDialog
    ?args=
        msg="Answer"
        &path=`${imageDirPath}/{{ IMAGE_NAME }}`
        &imageDialogMapCon=`hideButtons=ok`
,

