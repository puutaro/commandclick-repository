
visible=ON,

disable=OFF,
    color=darkGreen,

click=
    acVar=runToTableState
        ?importPath=`${cmdTtsPlayerChangeStateAction}`
        ?replace=
            STATE=`${TABLE}`,
