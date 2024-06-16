
color=darkGreen,
disable=OFF,

click=
    acVar=runToConfigState
        ?importPath=
            `${cmdMusicPlayerChangeStateAction}`
        ?replace=
            STATE=`${CONFIG}`
            &ENABLE_ADD_TO_BACKSTACK=ON,
