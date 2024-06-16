// js/action

tsvVars="listDir => playTsvPath"
    ?importPath=
        `${cmdMusicPlayerManagerListIndexTsvPath}`
|var=tempPlayCon
    ?func=jsTsv.getSr
    ?args=
        tsvPath=`${playTsvPath}`
|var=extraContent
    ?func=jsFileSystem.read
    ?args=
        path=`${cmdMusicPlayerPlayInfoPath}`
|acVar=runNormalPlay
    ?importPath=`${cmdMusicPlayerMusicAction}`
    ?replace=
        TEMP_PLAY_CON=`${tempPlayCon}`
        &EXTRA_CONTENT=`${extraContent}`
,
