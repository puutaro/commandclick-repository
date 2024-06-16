// js/action

tsvVars="listDir => playListForNormalPlay"
    ?importPath=
        `${cmdYoutuberManagerListIndexTsvPath}`
|var=playUrl
    ?func=jsTsv.getSr
    ?args=
        path="${playListForNormalPlay}"
|var=playInfo
    ?func=jsFileSystem.read
    ?args=
        path="${cmdYoutuberPlayInfoPath}"
|acVar=runNormalPlay
    ?importPath=
        `${cmdYoutuberMusicAction}`
    ?replace=
        TEMP_PLAY_CON=`${playUrl}`
        &EXTRA_CONTENT=`${playInfo}`
        ,
