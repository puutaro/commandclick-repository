
color=darkGreen,
disable=OFF,

click=
    actionImport=
        `${cmdMusicPlayerChangeStateAction}`
    |replace=
        STATE=`${CONFIG}`
        !DISABLE_ADD_TO_BACKSTACK=false,
