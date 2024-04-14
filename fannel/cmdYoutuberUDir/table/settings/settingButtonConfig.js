
color=darkGreen,
disable=OFF,

click=
    actionImport=
        `${cmdYoutuberChangeStateAction}`
    |replace=
        STATE=`${CONFIG}`
        ?DISABLE_ADD_TO_BACKSTACK=false,
