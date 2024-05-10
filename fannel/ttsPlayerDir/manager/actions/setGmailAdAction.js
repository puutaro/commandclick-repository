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
    ?exitJudge=`
        updateGmailAdd
        && !updateGmailAdd.startsWith("https://")
        && !updateGmailAdd.includes("mail")
        `
    ?exitToast=`invalid gmail url ${updateGmailAdd}`

|func=jsFileSystem.write
    if=`updateGmailAdd`
    ?args=
        path=`${cmdTtsPlayerManagerGmailAdTsvPath}`
        &con=`${gmailAdTsvKey}\t${updateGmailAdd}`
