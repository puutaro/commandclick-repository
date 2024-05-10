// js/action

tsvImport=
    `${cmdYoutuberManagerListIndexTsvPath}`
    ?use="listDir => playListForNormalPlay"
|var=playUrl
    ?func=jsTsv.getSr
    ?args=path="${playListForNormalPlay}"
|var=playInfo
    ?func=jsFileSystem.read
    ?args=path="${cmdYoutuberPlayInfoPath}"
|actionImport=
    `${cmdYoutuberMusicAction}`
|replace=
    TEMP_PLAY_CON=`${playUrl}`
    ?EXTRA_CONTENT=`${playInfo}`
        ,
