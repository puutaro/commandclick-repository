
visible=ON,

disable=OFF,
    color=darkGreen,

click=
    acVar=runToTableState
        ?importPath=`${cmdYoutuberChangeStateAction}`
        ?replace=
            STATE=`${TABLE}`,
