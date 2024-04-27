
disable=OFF,
color=darkGreen,
icon=setting,

click=
    actionImport=
        `${cmdMusicPlayerChangeStateAction}`
    |replace=
        STATE=`${CONFIG}`
        ?DISABLE_ADD_TO_BACKSTACK=false,
