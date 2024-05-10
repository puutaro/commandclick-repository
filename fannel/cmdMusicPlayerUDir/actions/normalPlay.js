// js/action

tsvImport=
    `${cmdMusicPlayerManagerListIndexTsvPath}`
    ?use="listDir => playTsvPath"
|var=tempPlayCon
    ?func=jsTsv.getSr
    ?args=tsvPath=`${playTsvPath}`
|var=extraContent
    ?func=jsFileSystem.read
    ?args=path=`${cmdMusicPlayerPlayInfoPath}`
|actionImport=
    `${cmdMusicPlayerMusicAction}`
|replace=
    TEMP_PLAY_CON=
        `${tempPlayCon}`
    ?EXTRA_CONTENT=`${extraContent}`
        ,
