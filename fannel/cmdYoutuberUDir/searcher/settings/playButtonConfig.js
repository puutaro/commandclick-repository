

click=
    onScriptSave=ON
    |var=onUbuntuPlay
        ?func=jsBeforeInfo.misMatch
        ?args=
            beforeInfoPath=`${cmdYoutuberSearcherPastSearchInfoPath}`
            &curInfo=`${extraButton}${playMode}`
    |var=runSearchAndPlay
        ?when=`onUbuntuPlay`
        ?func="jsUbuntu.boot"
        ?if=`"${extraButton}" == ''`
        ?func=exitZero
        ?func=jsUbuntu.execScriptByBackground
        ?args=
            shellPath=`${cmdYoutuberUbuntuScrapingShellPath}`
            &argsTabSepaStr=
                `searchWord=${extraButton},
                outputTsvPath=${cmdYoutuberWebSearchPlayListPath}`
            &monitorNum=`NO_QUOTE:2`
        ?func=exitZero
    |acVar=runNormalPlay
        ?importPath=
            `${cmdYoutuberNormalPlayAction}`
        ,
