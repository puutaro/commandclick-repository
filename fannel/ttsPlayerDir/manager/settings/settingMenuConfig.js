
name="Set gmail address"
|icon=mail
|actionImport=
    `${cmdTtsPlayerManagerSetGmailAdActionPath}`,

name="Setting tts"
|icon=setting
|actionImport=
    `${cmdTtsPlayerChangeStateAction}`
|replace=
    STATE=`${CONFIG}`
    ?DISABLE_ADD_TO_BACKSTACK=false,

