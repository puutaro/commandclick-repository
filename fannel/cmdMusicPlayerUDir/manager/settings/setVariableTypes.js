

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
                func=GET_FILES
                ?args=
                    suffix="${M4A_SUFFIX}&${MP3_SUFFIX}"
                    &initialPath="${STORAGE}/Music"
                    &macro=FROM_RECENT_DIR
                    &tag=addByBulk
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
                func=GET_FILE
                ?args=
                    suffix="${M4A_SUFFIX}&${MP3_SUFFIX}"
                    &initialPath="${STORAGE}/Music"
                    &macro=FROM_RECENT_DIR
                    &tag=addByOne
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
        |${BTN_CMD}= jsac "func=jsMusic.stop"
            ?${BTN_LABEL}="■"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF,
