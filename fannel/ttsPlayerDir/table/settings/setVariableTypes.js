

appHeader:
    TXTP:RO=
        onUnderLine=OFF
        !shellPath=`${makeHeaderTitleShell}`
        ,

table:
    LI=,

extraButton:
    TXTP:BTN:BTN:HL=
        onUnderLine=OFF
            !height=`${lineHeight}`
        |${BTN_CMD}= jsac `
                jsPath=ADD
                |args=
                    compPrefix=${TTS_PREFIX}
                    !compSuffix=${TSV_SUFFIX},
                `
            !${BTN_LABEL}="＋"
            !${BTN_TEXT_SIZE}=`${textSize}`
            !${BTN_BORDER}=OFF
        |${BTN_CMD}= jsac "jsPath=jsTextToSpeech.stopService"
            !${BTN_LABEL}="■"
            !${BTN_TEXT_SIZE}=`${textSize}`
            !${BTN_BORDER}=OFF,
