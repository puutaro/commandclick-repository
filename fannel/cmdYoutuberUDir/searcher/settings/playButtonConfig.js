

click=
    onScriptSave=ON
    |var=onUbuntuPlay
        ?func=jsBeforeInfo.misMatch
        ?args=
            beforeInfoPath=`${cmdYoutuberSearcherPastSearchInfoPath}`
            &curInfo=`${extraButton}${playMode}`
    |func="jsUbuntu.boot"
        ?id=execByUbuntu
        ?if=`onUbuntuPlay`
    |func=jsUbuntu.execScriptByBackground
        ?after=execByUbuntu
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
