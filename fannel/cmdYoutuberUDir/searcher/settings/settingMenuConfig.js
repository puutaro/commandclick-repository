
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
        ?ENABLE_ADD_TO_BACKSTACK=ON,

