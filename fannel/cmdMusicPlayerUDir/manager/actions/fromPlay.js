
tsvImport=
    `${cmdMusicPlayerManagerListIndexTsvPath}`
    ?use="listDir => playTsvPathForFromPlay"
|var=playInfo
    ?func=jsFileSystem.read
    ?args=
        path=`${cmdMusicPlayerPlayInfoPath}`
|var=trackName
    ?func=jsPath.basename
    ?args=
        tsvPath=`${ITEM_NAME}`
|var=tempPlayCon
    ?func=jsTsv.getSrFromThis
    ?args=
        tsvPath="${playTsvPathForFromPlay}"
        &thisLine="${ITEM_NAME}"
    ?exitJudge="!tempPlayCon"
    ?exitToast="No exist play con"
|actionImport=
    `${cmdMusicPlayerMusicAction}`
|replace=
    PLAY_MODE=ordinaly
    ?TEMP_PLAY_CON=
        `NO_QUOTE:tempPlayCon`
    ?EXTRA_CONTENT=
        `${playInfo} from ${trackName}`,