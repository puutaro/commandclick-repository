
name=Delete
|icon=cancel
|jsPath=SIMPLE_DELETE
,

name=Rename
|icon=edit_frame
|jsPath=RENAME
,

name="From Play"
|icon=play
|tsvImport=
    `${cmdTtsPlayerManagerListIndexTsvPath}`
|jsCon=
    `var playInfo = 
        jsF.r("${cmdTtsPlayerPlayInfoPath}")`
|jsCon=
    `var trackName = 
        jsPath.basename("${ITEM_NAME}")`
|actionImport=
    `${cmdTtsPlayerTtsAction}`
|replace=
    PLAY_MODE=ordinaly
    !TEMP_PLAY_CON=
        `${jsTsv.getSrFromThis("${listDir}", "${ITEM_NAME}")}`
    !EXTRA_CONTENT=
        `${playInfo} from ${trackName}`
    ,


name=Play
|icon=play
|actionImport=
    `${cmdTtsPlayerTtsAction}`
|replace=
    TEMP_PLAY_CON=
        `${ITEM_NAME}`
    !EXTRA_CONTENT=
        `${jsF.r("${cmdTtsPlayerPlayInfoPath}")} ${jsPath.basename("${ITEM_NAME}")}`
,
