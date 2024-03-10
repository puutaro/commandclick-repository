

appHeader:
    TXTP:RO=
        onUnderLine=OFF
        !shellPath=`${makeHeaderTitleShell}`
        !args=
            STATE=`$(cat ${cmdTtsPlayerPlayInfoPath})`
        ,
//             cat "${cmdTtsPlayerManagerListIndexTsvPath}"
// | ${b} grep -E "^listDir"
// | ${b} cut -f 2
// | basename $(cat)
// | ${b} cut -f1 -d'.'

manager:
    LI=,

extraButton:
     TXTP:BTN:BTN:HL=
         onUnderLine=OFF
                !height=`${lineHeight}`
         |${BTN_CMD}= jsac `
                    tsvImport=${cmdTtsPlayerManagerListIndexTsvPath}
                    |jsPath=jsAddUrlCon.add_S
                    |args=
                        urlStringOrMacro=RECENT
                        !onSearchBtn=ON
                        !urlConSaveParentDirPath=${cmdTtsPlayerSaveUrlConDirPath}
                        !compSuffix=${TXT_SUFFIX}
                    ,`
                !${BTN_LABEL}="+🌐"
                !${BTN_TEXT_SIZE}=`${textSize}`
                !${BTN_BORDER}=OFF
         |${BTN_CMD}= jsac `
                    |tsvImport=${cmdTtsPlayerManagerGmailAdTsvPath}
                    |jsPath=jsAddGmailCon.add
                    |args=
                        gmailAd=${gmailAd}
                        !urlConSaveParentDirPath=${cmdTtsPlayerSaveUrlConDirPath}
                        !compSuffix=${TXT_SUFFIX}
                    ,`
                !${BTN_LABEL}="+📧"
                !${BTN_TEXT_SIZE}=`${textSize}`
                !${BTN_BORDER}=OFF,
         // |${BTN_CMD}=jsac `
         //            jsPath=D_MENU
         //                |args=
         //                    menuPath=${cmdTtsPlayerManagerSettingMenuPath}
         //                    !title="Setting menu"
         //            ,`
         //        !${BTN_LABEL}="⚙️"
         //        !${BTN_TEXT_SIZE}=`${textSize}`
         //        !${BTN_BORDER}=OFF,