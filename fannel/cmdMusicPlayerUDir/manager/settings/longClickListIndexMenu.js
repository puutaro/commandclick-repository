
name=Delete
|icon=cancel
|jsPath=SIMPLE_DELETE
,

name=Play
|icon=play
|actionImport=
    `${cmdMusicPlayerMusicAction}`
|replace=
    TEMP_PLAY_CON=
        `${ITEM_NAME}`
    ?EXTRA_CONTENT=
        `${jsF.r("${cmdMusicPlayerPlayInfoPath}")} ${jsPath.basename("${ITEM_NAME}")}`
,
