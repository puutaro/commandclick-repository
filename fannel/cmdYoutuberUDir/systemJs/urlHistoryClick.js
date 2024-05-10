// js/action

tsvImport=
    `${cmdYoutuberManagerListIndexTsvPath}`
    ?use="listDir => playListPath"
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
|actionImport=
    `${cmdYoutuberMusicAction}`
|replace=
    TEMP_PLAY_CON="${tempPlayCon}"
    ?EXTRA_CONTENT=`${playInfo}`,