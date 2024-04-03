// js/action

js=
    var="defaultGmailAd"
    ?func=jsTsv.getFirstValue
    ?args=
        path=`${cmdTtsPlayerManagerGmailAdTsvPath}`

|js=
    var="updateGmailAdd"
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

|js=
    if=`updateGmailAdd`
    ?func=jsF.w
    ?args=
        path=`${cmdTtsPlayerManagerGmailAdTsvPath}`
        &con=`${gmailAdTsvKey}\t${updateGmailAdd}`
