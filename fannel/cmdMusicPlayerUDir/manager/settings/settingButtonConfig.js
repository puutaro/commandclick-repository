
disable=OFF,
color=darkGreen,
icon=setting,

click=
    actionImport=
        `${cmdMusicPlayerChangeStateAction}`
    |replace=
        STATE=`${CONFIG}`
        ?ENABLE_ADD_TO_BACKSTACK=ON,
