// js/action

var=isInstall
    ?func=jsUbuntu.isInstall
    ?args=
        installStampFilePath=`${cmdYoutuberInstallStampFilePath}`
        &expectStampCon="ok"
        &confirmTitleAndMsg="Press install button|"
        &installOneList="install\tpuzzle"
        &cautionTitleAndMsg="Caution!|Install by ⚙️ button"
    ?exitJudge=isInstall

|func=jsUbuntu.untilSetupLoop
    ?args=
        launchJsPath=`${cmdYoutuberSearcherInitActionsPath}`

|actionImport=
    `${cmdYoutuberSearcherInstallActionsPath}`,
