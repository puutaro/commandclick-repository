// js/action

tsvVars="listDir => playListPath"
    ?importPath=
        `${cmdYoutuberManagerListIndexTsvPath}`
|var=listDir
    ?value=`${cmdYoutuberPlayListPath}`
|var=tempPlayCon
    ?func=jsTsv.getSr
    ?args=
        playListPath=`${playListPath}`
|var=playInfo
    ?func=jsFileSystem.read
    ?args=
        playInfoPath="${cmdYoutuberPlayInfoPath}"
|acVar=runPlay
    ?importPath=
        `${cmdYoutuberMusicAction}`
    ?replace=
        TEMP_PLAY_CON="${tempPlayCon}"
        &EXTRA_CONTENT=`${playInfo}`,