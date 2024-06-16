// js/action

var=defaultGmailAd
    ?func=jsTsv.getFirstValue
    ?args=
        path=`${cmdTtsPlayerManagerGmailAdTsvPath}`

|var=updateGmailAdd
    ?func=jsDialog.prompt
    ?args=
        title=`Gmail ad set`
        &message=
        &promptMapCon=
            `editText=
                default=${defaultGmailAd}`
    |var=runExitJudge
        ?when=`
            updateGmailAdd
            && !updateGmailAdd.startsWith("https://")
            && !updateGmailAdd.includes("mail")
        `
        ?func=jsToast.short
        ?args=
            msg=`invalid gmail url ${updateGmailAdd}`
        ?func=exitZero
|var=runAddGmailAdress
    ?func=jsFileSystem.write
    ?when=`updateGmailAdd`
    ?args=
        path=`${cmdTtsPlayerManagerGmailAdTsvPath}`
        &con=`${gmailAdTsvKey}\t${updateGmailAdd}`
