

appHeader:
    TXTP:RO=
        onUnderLine=OFF
        ?shellPath=MAKE_HEADER_TITLE
        ?args=
            fannelPath=`${FANNEL_PATH}`
            &extraTitle=`file://${cmdYoutuberPlayInfoPath}`
        ,

manager:
    LI=,

extraButton:
     TXTP:BTN:BTN:HL=
         onUnderLine=OFF
            ?height=`${lineHeight}`
         |${BTN_CMD}= jsac `
                func=ADD_URL
                    ?args=
                        url="https://www.youtube.com/"
                        &onSearchBtn=OFF
                ,`
            ?${BTN_LABEL}="+🎦"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF
            ?alter=`
                shellIfPath=JUDGE_LIST_DIR
                ?ifArgs=
                    tsvPath=${cmdYoutuberManagerListIndexTsvPath}
                    &tsvValue="
                        ${cmdYoutuberPreviousMusicPlayListPath}
                        &${cmdYoutuberLikeMusicPlayListPath}"
                ?onPut=OFF`
        |${BTN_CMD}= jsac "func=jsMusic.stop"
            ?${BTN_LABEL}="■"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF,
