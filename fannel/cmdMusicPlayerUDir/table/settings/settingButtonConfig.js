
color=darkGreen,
disable=OFF,

click=
    actionImport=
        `${cmdMusicPlayerChangeStateAction}`
    |replace=
        STATE=`${CONFIG}`
        ?ENABLE_ADD_TO_BACKSTACK=ON,
