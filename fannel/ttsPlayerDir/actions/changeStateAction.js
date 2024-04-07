

js=
    id=listDirUpdater
    ?if="{{ ON_LIST_DIR_UPDATER:false }}"
    ?func=jsListTsvUpdater.update
    ?args=
        tsvPath=
            `${cmdTtsPlayerManagerListIndexTsvPath}`
        &settingMap=
            `${listDirKey}=${ITEM_NAME}`
        &separator="|"
|js=
    if="{{ ON_PLAY_INFO_SAVE:false }}"
    ?var=playListTsv
    ?func=jsTsv.getKeyValue
    ?args=
        path=`${cmdTtsPlayerManagerListIndexTsvPath}`
        &key=`${listDirKey}`
    ?afterJsCon=
        playListTsv=`jsPath.basename(playListTsv)`
        &playListTsv=`jsPath.removeExtend(
                    playListTsv,
                    "${TSV_SUFFIX}",
                )`
        &"save play list info"=`
            jsF.w(
                "${cmdTtsPlayerPlayInfoPath}",
                playListTsv
           )`
|js=
    id=changeState
    ?func=jsCmdValFrag.stateChange_S
    ?args=
        state="{{ STATE }}"
        &disableAddToBackStack=
            NO_QUOTE:{{ DISABLE_ADD_TO_BACKSTACK:true }},
