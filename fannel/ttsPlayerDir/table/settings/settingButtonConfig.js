
color=darkGreen,
disable=OFF,

click=
    actionImport=
        `${cmdTtsPlayerChangeStateAction}`
    |replace=
        STATE=`${CONFIG}`
        ?ENABLE_ADD_TO_BACKSTACK=ON,
