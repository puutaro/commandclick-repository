
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
                jsPath=ADD
                ?args=
                    compPrefix=${TUBE_PREFIX}
                    &compSuffix=PlayList${TSV_SUFFIX}
                    &dirName=${cmdYoutuberPlayListTableDirPath}
                    &titleArgs=
                        "macro=CAMEL_TO_BLANK_SNAKE
                        ?removeSuffix=PlayList${TSV_SUFFIX}&${TSV_SUFFIX}&List&Play
                        ?compSuffix=List
                        "
                    ,
                `
            ?${BTN_LABEL}="＋"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF
        |${BTN_CMD}= jsac "jsPath=jsMusic.stop"
            ?${BTN_LABEL}="■"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF,
