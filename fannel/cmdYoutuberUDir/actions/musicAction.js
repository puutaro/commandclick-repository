// js/action

js=
    ?func=jsFileSystem.write
    ?args=
        path=`${cmdYoutuberTempFilePath}`
        &con=`{{ TEMP_PLAY_CON }}`
|jsPath=jsMusic.play
    ?args=
        tempPlayListPath=`${cmdYoutuberTempFilePath}`
        &extraSettingMapStr=`
            importance=high
            |playMode={{ PLAY_MODE:${playMode} }}
            |onLoop=on
            |onTrack=on
            |playNumber=
            |currentAppDirName=${jsPath.basename("${currentAppDirPath}")},
            |scriptRawName=${jsPath.trimAllExtend("${02}")},
            |extraContent=
                {{ EXTRA_CONTENT }}
            |shellPath=SAVE_PLAY_LIST
            |shellArgs=
                savePath=${cmdYoutuberPreviousMusicPlayListPath}`
            ,