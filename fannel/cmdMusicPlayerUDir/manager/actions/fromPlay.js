
tsvVars="listDir => playTsvPathForFromPlay"
    ?importPath=
        `${cmdMusicPlayerManagerListIndexTsvPath}`
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
    |var=runExitJudge
        ?when="!tempPlayCon"
        ?func=jsToast.short
        ?args=
            msg="No exist play con"
        ?func=exitZero
|acVar=runOrdinalyPlay
    ?importPath=
        `${cmdMusicPlayerMusicAction}`
    ?replace=
        PLAY_MODE=ordinaly
        &TEMP_PLAY_CON=`${tempPlayCon}`
        &EXTRA_CONTENT=
            `${playInfo} from ${trackName}`,
