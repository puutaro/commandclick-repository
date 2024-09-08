
visible=ON,
icon=list,
caption="table",

click=
    acVar=runToTableState
        ?importPath=`${preferenceChangeStateActionsPath}`
        ?replace=
            STATE=`${TABLE}`,
