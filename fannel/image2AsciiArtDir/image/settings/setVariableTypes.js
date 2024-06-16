

appHeader:
    TXTP:RO=
        onUnderLine=OFF
        ?shellPath=MAKE_HEADER_TITLE
        ?args=
            fannelPath=`${FANNEL_PATH}`
            &extraTitle=`file://${image2AsciiArtPlayInfoPath}`
        ,

ascii:
    LI=,

extraButton:
     TXTP:BTN:BTN:HL=
         onUnderLine=OFF
            ?height=`${lineHeight}`
        |${BTN_CMD}= jsac `
                acVar=runGetAscii
                    ?importPath=
                        "${image2AsciiArtSpannableWebViewAction}"
                ,
            `
            ?${BTN_LABEL}="＋"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF
            ?alter=`shellIfPath=JUDGE_LIST_DIR
                    ?ifArgs=
                        tsvPath=${image2AsciiArtAsciiListIndexTsvPath}
                        &tsvValue=${image2AsciiArtGalleryLikeDirPath}
                        &alterCon="?onPut=OFF"
                    `
        |${BTN_CMD}= jsac `
                tsvVars="listDir => imageDirPath"
                    ?importPath="${image2AsciiArtImageListIndexTsvPath}"
                |var=asciiDirPath
                    ?func=jsPath.dirname
                    ?args=
                        path=${imageDirPath}
                |acVar=runToAsciiState
                    ?importPath=
                        "${image2AsciiArtChangeStateAction}"
                    ?replace=
                        ON_LIST_DIR_UPDATER=ON
                        &TSV_PATH="${image2AsciiArtAsciiListIndexTsvPath}"
                        &LIST_DIR_OR_TSV_PATH="${asciiDirPath}"
                        &ON_INFO_SAVE=ON
                        &STATE="${ASCII}"
                ,
                `
            ?${BTN_LABEL}="⬅🎞️"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF,
