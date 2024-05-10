
color=darkGreen,
disable=OFF,

click=
    actionImport=
        `${cmdYoutuberChangeStateAction}`
    |replace=
        STATE=`${CONFIG}`
        ?ENABLE_ADD_TO_BACKSTACK=ON,
