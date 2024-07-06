// js/action

var=isInstall
    ?func=jsUbuntu.isInstall
    ?args=
        installStampFilePath=`${cmdYoutuberInstallStampFilePath}`
        &expectStampCon="ok"
        &confirmTitleAndMsg="Press install button|"
        &installOneList="install\tpuzzle"
        &cautionTitleAndMsg="Caution!|Install by ⚙️ button"
    |var=runExitJudge
        ?when=isInstall
        ?func=exitZero

|var=runUbuntuSetUpLoopAction
    ?func=jsUbuntu.untilSetupLoop
    ?args=
        launchJsPath=`${cmdYoutuberInitActionsPath}`

|acVar=runInstall
    ?importPath=
        `${cmdYoutuberInstallActionsPath}`,
