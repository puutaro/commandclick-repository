// js/action

func=jsFileSystem.write
    ?args=
        path=`${cmdMusicPlayerTempFilePath}`
        &con=`{{ TEMP_PLAY_CON }}`
|var=currentAppDirName
    ?func=jsPath.basename
    ?args=path="${currentAppDirPath}"
|var=scriptRawName
    ?func=jsPath.trimAllExtend
    ?args=scriptName="${02}"
|func=jsMusic.play
?args=
    tempPlayListPath=`${cmdMusicPlayerTempFilePath}`
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
            savePath=${cmdMusicPlayerPreviousMusicPlayListPath}`
            ,