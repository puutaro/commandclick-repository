
tsvImport=
    `${cmdYoutuberManagerListIndexTsvPath}`
    ?use="listDir => playlistTsvPathForFromPlay"
|var=playInfo
    ?func=jsFileSystem.read
    ?args=path="${cmdYoutuberPlayInfoPath}"
|var=trackName
    ?func=jsPath.basename
    ?args=path="${ITEM_NAME}"
|var=sortedPlayListFromThis
    ?func=jsTsv.getSrFromThis
    ?args=
        tsvPath="${playlistTsvPathForFromPlay}"
        &firstLine="${ITEM_NAME}"
|actionImport=
    `${cmdYoutuberMusicAction}`
|replace=
    PLAY_MODE=ordinaly
    ?TEMP_PLAY_CON=
        `${sortedPlayListFromThis}`
    ?EXTRA_CONTENT=
        `${playInfo} from ${trackName}`,