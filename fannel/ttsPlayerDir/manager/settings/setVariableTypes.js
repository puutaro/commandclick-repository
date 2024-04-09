

appHeader:
    TXTP:RO=
        onUnderLine=OFF
        ?shellPath=MAKE_HEADER_TITLE
        ?args=
            FANNEL_PATH=`${FANNEL_PATH}`
            &EXTRA_TITLE=`$(cat ${cmdTtsPlayerPlayInfoPath})`
        ,

manager:
    LI=,

extraButton:
     TXTP:BTN:BTN:BTN:HL=
         onUnderLine=OFF
            ?height=`${lineHeight}`
         |${BTN_CMD}= jsac `
                tsvImport=${cmdTtsPlayerManagerListIndexTsvPath}
                |jsPath=jsAddUrlCon.add_S
                |args=
                    urlStringOrMacro=RECENT
                    ?onSearchBtn=ON
                    ?urlConSaveParentDirPath=${cmdTtsPlayerSaveUrlConDirPath}
                    ?compSuffix=${TXT_SUFFIX}
                ,`
            ?${BTN_LABEL}="+🌐"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF
            ?alter=`
                shellIfPath=JUDGE_LIST_DIR
                ?ifArgs=
                    tsvPath=${cmdTtsPlayerManagerListIndexTsvPath}
                    &tsvValue=${cmdTtsPlayerPreviousTtsPlayListPath}
                ?shellIfPath=JUDGE_LIST_DIR
                ?ifArgs=
                    tsvPath=${cmdTtsPlayerManagerListIndexTsvPath}
                    &tsvValue=${cmdTtsPlayerLikePlayListPath}
                ?onPut=OFF
            `
         |${BTN_CMD}= jsac `
                |tsvImport=${cmdTtsPlayerManagerGmailAdTsvPath}
                |jsPath=jsAddGmailCon.add
                |args=
                    gmailAd=${gmailAd}
                    ?urlConSaveParentDirPath=${cmdTtsPlayerSaveUrlConDirPath}
                    ?compSuffix=${TXT_SUFFIX}
                ,`
            ?${BTN_LABEL}="+📧"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF
            ?alter=`
                shellIfPath=JUDGE_LIST_DIR
                ?ifArgs=
                    tsvPath=${cmdTtsPlayerManagerListIndexTsvPath}
                    &tsvValue=${cmdTtsPlayerPreviousTtsPlayListPath}
                ?shellIfPath=JUDGE_LIST_DIR
                ?ifArgs=
                    tsvPath=${cmdTtsPlayerManagerListIndexTsvPath}
                    &tsvValue=${cmdTtsPlayerLikePlayListPath}
                ?onPut=OFF
            `
        |${BTN_CMD}= jsac "jsPath=jsTextToSpeech.stopService"
            ?${BTN_LABEL}="■"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF,
