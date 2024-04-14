

extraButton:
    TXT:TXTP:ELSB:BTN:HL=
        onUnderLine=ON
            ?height=`${lineHeight}`
            ?hint=" web search"
        |listPath=${cmdYoutuberSearcherListFilePath}
            ?limitNum=20
            ?saveTags=ok
            ?saveValName="extraButton"
        |${BTN_CMD}= jsac "jsPath=jsMusic.stop"
            ?${BTN_LABEL}="■"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF,
