
name="Install"
|icon=puzzle
|actionImport=
    `${cmdYoutuberSearcherInstallActionsPath}`,

name="Setting tts"
|icon=setting
|actionImport=
    `${cmdYoutuberChangeStateAction}`
    |replace=
        STATE=`${CONFIG}`
            ?DISABLE_ADD_TO_BACKSTACK=false,

