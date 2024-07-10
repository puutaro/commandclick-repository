
name="Shortuct"
|icon=shortcut
|func=SHORTCUT
    ,

name="Player setting"
|icon=setting
|acVar=runToConfigState
    ?importPath=
        `${cmdMusicPlayerChangeStateAction}`
    ?replace=
        STATE=`${CONFIG}`
        &ENABLE_ADD_TO_BACKSTACK=ON,
