
name="Set gmail address"
|icon=mail
|alter=
    `shellIfPath=JUDGE_LIST_DIR
    |ifArgs=
        tsvPath="${cmdTtsPlayerManagerListIndexTsvPath}"
        ?tsvValue="
            ${cmdTtsPlayerPreviousTtsPlayListPath}
            &${cmdTtsPlayerLikePlayListPath}
        "
    |disable=ON`
|actionImport=
    `${cmdTtsPlayerManagerSetGmailAdActionPath}`,

name="Setting tts"
|icon=setting
|actionImport=
    `${cmdTtsPlayerChangeStateAction}`
|replace=
    STATE=`${CONFIG}`
    ?DISABLE_ADD_TO_BACKSTACK=false,

