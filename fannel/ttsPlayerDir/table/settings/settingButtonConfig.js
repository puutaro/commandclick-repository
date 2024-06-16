
color=darkGreen,
disable=OFF,

click=
    acVar=runToConfigState
        ?importPath=
            `${cmdTtsPlayerChangeStateAction}`
        ?replace=
            STATE=`${CONFIG}`
            &ENABLE_ADD_TO_BACKSTACK=ON,
