

js=
    desc="trigger only table"
    ?if="{{ ON_LIST_DIR_UPDATER:false }}"
    ?func=jsListTsvUpdater.update
    ?args=
        tsvPath=
            `${cmdMusicPlayerManagerListIndexTsvPath}`
        &settingMap=
            `${listDirKey}=${ITEM_NAME}`
        &separator="|"
|js=
    if="{{ ON_PLAY_INFO_SAVE:false }}"
    ?var=playListTsv
    ?func=jsTsv.getKeyValue
    ?args=
        path=`${cmdMusicPlayerManagerListIndexTsvPath}`
        &key=`${listDirKey}`
    ?afterJsCon=
        playListTsv=`jsPath.basename(playListTsv)`
        &playListTsv=`
            jsPath.removeExtend(
                playListTsv,
                "${TSV_SUFFIX}",
            )`
        &"save play list info"=`
            jsF.w(
                "${cmdMusicPlayerPlayInfoPath}",
                playListTsv
           )`
|js=
    id=changeState
    ?func=jsCmdValFrag.stateChange_S
    ?args=
        state="{{ STATE }}"
        &disableAddToBackStack=
            NO_QUOTE:{{ DISABLE_ADD_TO_BACKSTACK:true }},
