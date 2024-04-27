

js=
    id=listDirUpdater
    ?if="{{ ON_LIST_DIR_UPDATER:false }}"
    ?func=jsListTsvUpdater.update
    ?args=
        tsvPath=
            `${cmdYoutuberManagerListIndexTsvPath}`
        &settingMap=
            `${listDirKey}=${cmdYoutuberPlayListTableDirPath}/${ITEM_NAME}`
        &separator="|"
|js=
    if="{{ ON_PLAY_INFO_SAVE:false }}"
    ?var=playListTsv
    ?func=jsTsv.getKeyValue
    ?args=
        path=`${cmdYoutuberManagerListIndexTsvPath}`
        &key=`${listDirKey}`
    ?afterJsCon=
        playListTsv=`jsPath.basename(playListTsv)`
        &playListTsv=`jsPath.removePrefix(
                playListTsv,
                "${TUBE_PREFIX}",
        )`
        &playListTsv=`
            jsPath.removeExtend(
                playListTsv,
                "${TSV_SUFFIX}&List&Play",
            ) + " list"`
        &"save play list info"=`
            jsF.w(
                "${cmdYoutuberPlayInfoPath}",
                playListTsv
           )`
|js=
    id=changeState
    ?func=jsCmdValFrag.stateChange_S
    ?args=
        state="{{ STATE }}"
        &disableAddToBackStack=
            NO_QUOTE:{{ DISABLE_ADD_TO_BACKSTACK:true }},
