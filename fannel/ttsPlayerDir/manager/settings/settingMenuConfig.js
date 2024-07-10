
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
        ?alterCon="|disable=ON"
    `
|acVar=runSetGmailAd
    ?importPath=
        `${cmdTtsPlayerManagerSetGmailAdActionPath}`,

name="Shortuct"
|icon=shortcut
|func=SHORTCUT
,

name="Setting tts"
|icon=setting
|acVar=runToConfigState
    ?importPath=
        `${cmdTtsPlayerChangeStateAction}`
    ?replace=
        STATE=`${CONFIG}`
        &ENABLE_ADD_TO_BACKSTACK=ON,

