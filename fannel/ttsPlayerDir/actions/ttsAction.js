
js=
    id=tempPlayListWrite
    !func=jsFileSystem.write
    !args=
        path=`${cmdTtsPlayerTempFilePath}`
        &con=`{{ TEMP_PLAY_CON }}`
|jsPath=`jsTextToSpeech.speech`
|args=
    tempPlayListPath=`${cmdTtsPlayerTempFilePath}`
    !extraSettingMapStr=`
        playMode=${playMode}
        |onRoop=on
        |playNumber=
        |transMode=${toLang}
        |pitch=${pitch}
        |extraContent=
            {{ EXTRA_CONTENT }}
            // ${jsF.r("${cmdTtsPlayerPlayInfoPath}")}
        |shellPath=SAVE_PLAY_LIST
        // ${ttsOutputShallPath}
        |shellArgs=
            ttsPlayInfo=
                ${jsF.r("${cmdTtsPlayerPlayInfoPath}")}
            !savePath=${cmdTtsPlayerPreviousTtsPlayListPath}`
            ,