
tsvVars="listDir => playlistTsvPathForFromPlay"
    ?importPath=
        `${cmdYoutuberManagerListIndexTsvPath}`
|var=playInfo
    ?func=jsFileSystem.read
    ?args=
        path="${cmdYoutuberPlayInfoPath}"
|var=trackName
    ?func=jsPath.basename
    ?args=
        path="${ITEM_NAME}"
|var=sortedPlayListFromThis
    ?func=jsTsv.getSrFromThis
    ?args=
        tsvPath="${playlistTsvPathForFromPlay}"
        &firstLine="${ITEM_NAME}"
|acVar=runOrdinalyPlay
    ?importPath=
        `${cmdYoutuberMusicAction}`
    ?replace=
        PLAY_MODE=ordinaly
        &TEMP_PLAY_CON=
            `${sortedPlayListFromThis}`
        &EXTRA_CONTENT=
            `${playInfo} from ${trackName}`,