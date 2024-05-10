
func=jsFileSystem.write
    ?args=
        path=`${cmdTtsPlayerTempFilePath}`
        &con=`{{ TEMP_PLAY_CON }}`
|func=jsTextToSpeech.speech
    ?args=
        tempPlayListPath=`${cmdTtsPlayerTempFilePath}`
        &extraSettingMapStr=`
            playMode={{ PLAY_MODE:${playMode} }}
            |onRoop=on
            |playNumber=
            |transMode=${toLang}
            |onTrack=on
            |pitch=${pitch}
            |extraContent=
                {{ EXTRA_CONTENT }}
            |shellPath=SAVE_PLAY_LIST
            |shellArgs=
                ?savePath=${cmdTtsPlayerPreviousTtsPlayListPath}`
            ,