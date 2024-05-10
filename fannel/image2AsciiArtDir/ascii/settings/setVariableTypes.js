

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
                actionImport=
                    "${image2AsciiArtSpannableWebViewAction}"
                ,
            `
            ?${BTN_LABEL}="＋"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF
            ?alter= `shellIfPath=JUDGE_LIST_DIR
                    ?ifArgs=
                        tsvPath=${image2AsciiArtAsciiListIndexTsvPath}
                        &tsvValue=${image2AsciiArtGalleryLikeDirPath}
                    ?onPut=OFF`
        |${BTN_CMD}= jsac `
                tsvImport="${image2AsciiArtAsciiListIndexTsvPath}"
                    ?use="listDir => asciiDirPath"
                |var=asciiDirName
                    ?func=jsPath.basename
                    ?args=
                        path=${asciiDirPath}
                |actionImport=
                    "${image2AsciiArtChangeStateAction}"
                |replace=
                    ON_LIST_DIR_UPDATER=ON
                    ?TSV_PATH="${image2AsciiArtImageListIndexTsvPath}"
                    ?LIST_DIR_OR_TSV_PATH="${asciiDirPath}/image"
                    ?ON_INFO_SAVE=ON
                    ?EXTRA_SAVE_INFO=(${asciiDirName})
                    ?STATE="${IMAGE}"
                ,`
            ?${BTN_LABEL}="➡🎞️"
            ?${BTN_TEXT_SIZE}=`${textSize}`
            ?${BTN_BORDER}=OFF
         ,
