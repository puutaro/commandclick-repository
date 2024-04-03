

appHeader:
    TXTP:RO=
        onUnderLine=OFF
        ?shellPath=MAKE_HEADER_TITLE
        ?args=
            FANNEL_PATH=`${FANNEL_PATH}`
            &EXTRA_TITLE=`$(cat ${cmdMusicPlayerPlayInfoPath})`
        ,

manager:
    LI=,

extraButton:
     TXTP:BTN:BTN:BTN:HL=
         onUnderLine=OFF
            ?height=`${lineHeight}`
         |${BTN_CMD}= jsac `
                tsvImport=${cmdMusicPlayerManagerListIndexTsvPath}
                |jsPath=GET_FILES
                |args=
                    suffix=${M4A_SUFFIX}&${MP3_SUFFIX}
                ,`
            ?${BTN_LABEL}="+📁"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF
        |${BTN_CMD}= jsac `
                tsvImport=${cmdMusicPlayerManagerListIndexTsvPath}
                |jsPath=GET_FILE
                |args=
                    suffix=${M4A_SUFFIX}&${MP3_SUFFIX}
                ,`
            ?${BTN_LABEL}="+🎵"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF
        |${BTN_CMD}= jsac "jsPath=jsMusic.stop"
            ?${BTN_LABEL}="■"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF,
