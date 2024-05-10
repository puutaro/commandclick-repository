

appHeader:
    TXTP:RO=
        onUnderLine=OFF
        ?shellPath=MAKE_HEADER_TITLE
        ?args=
            fannelPath=`${FANNEL_PATH}`
            &extraTitle=
        ,

table:
    LI=,

extraButton:
    TXTP:BTN:BTN:HL=
        onUnderLine=OFF
            ?height=`${lineHeight}`
        |${BTN_CMD}= jsac `
                func=ADD
                    ?args=
                        &dirPath=${image2AsciiArtGalleryDirPath}
                        &titleArgs=
                            "macro=CAMEL_TO_BLANK_SNAKE
                            ?compSuffix=List
                            ",
                `
            ?${BTN_LABEL}="＋"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF
        |${BTN_CMD}= jsac "func=jsTextToSpeech.stopService"
            ?${BTN_LABEL}="■"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF,
