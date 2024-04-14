// js/action

js=
    var=isInstall
    ?func=jsUbuntu.isInstall
    ?args=
        installStampFilePath=`${cmdYoutuberInstallStampFilePath}`
        &expectStampCon="ok"
        &confirmTitleAndMsg="Press install button|"
        &installOneList="install\tpuzzle"
        &cautionTitleAndMsg="Caution!|Install by ⚙️ button"
    ?exitJudge=isInstall

|js=
    func=jsUbuntu.untilSetupLoop
    ?args=
        launchJsPath=`${cmdYoutuberSearcherInitActionsPath}`

|actionImport=
    `${cmdYoutuberSearcherInstallActionsPath}`,
