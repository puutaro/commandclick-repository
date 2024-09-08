
visible=ON,

disable=OFF,
    color=darkGreen,
caption="table",

click=
    acVar=runToTableState
        ?importPath=`${image2AsciiArtChangeStateAction}`
        ?replace=
            STATE=`${TABLE}`,
