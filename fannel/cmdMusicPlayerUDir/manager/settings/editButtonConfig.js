
visible=ON,

disable=OFF,
    color=darkGreen,

click=
    acVar=runToTableState
        ?importPath=`${cmdMusicPlayerChangeStateAction}`
        ?replace=
            STATE=`${TABLE}`,
