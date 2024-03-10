
color=darkGreen,
disable=OFF,

click=
    actionImport=
        `${cmdTtsPlayerChangeStateAction}`
    |replace=
        STATE=`${CONFIG}`
        !DISABLE_ADD_TO_BACKSTACK=false,
