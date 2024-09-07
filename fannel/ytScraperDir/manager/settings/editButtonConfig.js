
visible=ON,

disable=OFF,
color=darkGreen,
caption="table",

click=
    acVar=runToTableState
        ?importPath=`${cmdYoutuberChangeStateAction}`
        ?replace=
            STATE=`${TABLE}`,
