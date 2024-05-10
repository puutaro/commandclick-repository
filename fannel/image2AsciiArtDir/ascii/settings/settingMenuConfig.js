
name="Set gmail address"
|icon=mail
|alter=
    `shellIfPath=JUDGE_LIST_DIR
    |ifArgs=
        tsvPath="${image2AsciiArtAsciiListIndexTsvPath}"
        ?tsvValue="
            ${image2AsciiArtPreviousListPath}
            &${image2AaciiArtLikePlayListPath}
        "
    |disable=ON`
|actionImport=
    `${image2AsciiArtAsciiSetGmailAdActionPath}`,

name="Setting tts"
|icon=setting
|actionImport=
    `${image2AsciiArtChangeStateAction}`
|replace=
    STATE=`${CONFIG}`
    ?DISABLE_ADD_TO_BACKSTACK=false,

