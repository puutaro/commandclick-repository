

appHeader:
    TXTP:RO=
        onUnderLine=OFF
        ?shellPath=MAKE_HEADER_TITLE
        ?args=
            fannelPath=`${FANNEL_PATH}`
            &extraTitle=`file://${cmdTtsPlayerPlayInfoPath}`
        ,

manager:
    LI=,

extraButton:
     TXTP:BTN:BTN:BTN:HL=
         onUnderLine=OFF
            ?height=`${lineHeight}`
         |${BTN_CMD}= jsac `
                func=jsAddUrlCon.add_S
                    ?args=
                        extraMapCon="
                            url=RECENT
                            |onSearchBtn=ON
                            |urlConSaveParentDirPath=${cmdTtsPlayerSaveUrlConDirPath}
                            |compSuffix=${TXT_SUFFIX}
                            |onSaveUrlHistory=ON
                        "
                ,`
            ?${BTN_LABEL}="+🌐"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF
            ?alter=`
                shellIfPath=JUDGE_LIST_DIR
                ?ifArgs=
                    tsvPath=${cmdTtsPlayerManagerListIndexTsvPath}
                    &tsvValue="
                        ${cmdTtsPlayerPreviousTtsPlayListPath}
                        &${cmdTtsPlayerLikePlayListPath}"
                    &alterCon="?onPut=OFF"
            `
         |${BTN_CMD}= jsac `
                |tsvVars="gmailAd"
                    ?importPath=${cmdTtsPlayerManagerGmailAdTsvPath}
                |var=runGmailAd
                    ?func=jsAddGmailCon.add
                    ?args=
                        gmailAd=${gmailAd}
                        &extraMap="
                            urlConSaveParentDirPath=${cmdTtsPlayerSaveUrlConDirPath}
                            |compSuffix=${TXT_SUFFIX}
                        "
                ,`
            ?${BTN_LABEL}="+📧"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF
            ?alter=`
                shellIfPath=JUDGE_LIST_DIR
                ?ifArgs=
                    tsvPath=${cmdTtsPlayerManagerListIndexTsvPath}
                    &tsvValue="
                        ${cmdTtsPlayerPreviousTtsPlayListPath}
                        &${cmdTtsPlayerLikePlayListPath}"
                    &alterCon="?onPut=OFF"
            `
        |${BTN_CMD}= jsac "func=jsTextToSpeech.stopService"
            ?${BTN_LABEL}="■"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF,
