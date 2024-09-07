// js/action

var=runStartToast
    ?func=jsToast.long
    ?args=msg="play.."
|var=runSavePlayTempFile
    ?func=jsFileSystem.write
    ?args=
        path=`${cmdYoutuberTempFilePath}`
        &con=`{{ TEMP_PLAY_CON }}`
|var=currentAppDirName
    ?func=jsPath.basename
    ?args=
        path="${currentAppDirPath}"
|var=scriptRawName
    ?func=jsPath.trimAllExtend
    ?args=
        scriptName="${02}"
|var=runMusicPlay
    ?func=jsMusic.play
    ?args=
        tempPlayListPath=`${cmdYoutuberTempFilePath}`
        &extraSettingMapStr=`
            importance=high
            |playMode={{ PLAY_MODE:${playMode} }}
            |onLoop=on
            |onTrack=on
            |playNumber=
            |currentAppDirName=${currentAppDirName},
            |scriptRawName=${scriptRawName},
            |extraContent=
                {{ EXTRA_CONTENT }}
            |shellPath=SAVE_PLAY_LIST
            |shellArgs=
                savePath=${cmdYoutuberPreviousMusicPlayListPath}`
            ,