

appHeader:
    TXTP:RO=
        onUnderLine=OFF
        ?shellPath=MAKE_HEADER_TITLE
        ?args=
            fannelPath=`${FANNEL_PATH}`
            &extraTitle=`file://${cmdMusicPlayerPlayInfoPath}`
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
                ?args=
                    suffix="${M4A_SUFFIX}&${MP3_SUFFIX}"
                ,`
            ?${BTN_LABEL}="+📁"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF
            ?alter=
                `shellIfPath=JUDGE_LIST_DIR
                ?ifArgs=
                    tsvPath=${cmdMusicPlayerManagerListIndexTsvPath}
                    &tsvValue="
                        ${cmdMusicPlayerPreviousMusicPlayListPath}
                        &${cmdMusicPlayerLikePlayListPath}"
                ?onPut=OFF
                `
        |${BTN_CMD}= jsac `
                tsvImport=${cmdMusicPlayerManagerListIndexTsvPath}
                |jsPath=GET_FILE
                ?args=
                    suffix="${M4A_SUFFIX}&${MP3_SUFFIX}"
                ,`
            ?${BTN_LABEL}="+🎵"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF
            ?alter=
                `shellIfPath=JUDGE_LIST_DIR
                ?ifArgs=
                    tsvPath=${cmdMusicPlayerManagerListIndexTsvPath}
                    &tsvValue="
                        ${cmdMusicPlayerPreviousMusicPlayListPath}
                        &${cmdMusicPlayerLikePlayListPath}"
                ?onPut=OFF
                `
        |${BTN_CMD}= jsac "jsPath=jsMusic.stop"
            ?${BTN_LABEL}="■"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF,
