

name="Setting tts"
|icon=setting
|acVar=runToConfigState
    ?importPath=
        `${image2AsciiArtChangeStateAction}`
    ?replace=
        STATE=`${CONFIG}`
        &DISABLE_ADD_TO_BACKSTACK=false,

