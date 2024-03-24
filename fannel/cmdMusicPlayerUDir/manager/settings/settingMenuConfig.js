
// name="Set gmail address"
// |icon=mail
// |actionImport=
//     `${cmdMusicPlayerManagerSetGmailAdActionPath}`,

name="Setting tts"
|icon=setting
|actionImport=
    `${cmdMusicPlayerChangeStateAction}`
|replace=
    STATE=`${CONFIG}`
    !DISABLE_ADD_TO_BACKSTACK=false,

