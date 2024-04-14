

click=
    onScriptSave=ON
    |js=
        var=onUbuntuPlay
        ?func=jsBeforeInfo.misMatch
        ?args=
            beforeInfoPath=`${cmdYoutuberSearcherPastSearchInfoPath}`
            &curInfo=`${extraButton}${playMode}`
    |js=
        if=`onUbuntuPlay`
        ?prefix="jsUbuntu.boot();"
        ?func=jsUbuntu.execScriptByBackground
        ?args=
            shellPath=`${cmdYoutuberUbuntuScrapingShellPath}`
            &argsTabSepaStr=
                `searchWord=${extraButton},
                outputTsvPath=${cmdYoutuberWebSearchPlayListPath}`
            &monitorNum=`NO_QUOTE:2`
        ?exitJudge=true
    |actionImport=
        `${cmdYoutuberNormalPlayAction}`
        ,
