// js/action

var=playInfo
    ?func=jsFileSystem.read
    ?args=path=`${cmdYoutuberPlayInfoPath}`
|actionImport=
    `${cmdYoutuberMusicAction}`
|replace=
    TEMP_PLAY_CON=
        `${LONG_PRESS_LINK_URL}`
    ?EXTRA_CONTENT= `${playInfo}`
    ,
