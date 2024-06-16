
disable=OFF,
color=darkGreen,
icon=setting,

click=
    acVar=runToConfigState
        ?importPath=
            `${cmdMusicPlayerChangeStateAction}`
        ?replace=
            STATE=`${CONFIG}`
            &ENABLE_ADD_TO_BACKSTACK=ON,
