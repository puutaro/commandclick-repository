// js/action

js=
    var="defaultGmailAd"
    !func=jsTsv.getFirstValue
    !args=
        path=`${cmdTtsPlayerManagerGmailAdTsvPath}`

|js=
    var="updateGmailAdd"
    !func=jsDialog.prompt
    !args=
        title=`Gmail ad set`
        &message=
        &promptMapCon=
            `editText=
                default=${defaultGmailAd}`
    !exitJudge=`
        updateGmailAdd
        && !updateGmailAdd.startsWith("https://")
        && !updateGmailAdd.includes("mail")
        `
    !exitToast=`invalid gmail url ${updateGmailAdd}`

|js=
    if=`updateGmailAdd`
    !func=jsF.w
    !args=
        path=`${cmdTtsPlayerManagerGmailAdTsvPath}`
        &con=`${gmailAdTsvKey}\t${updateGmailAdd}`


// !afterJsCon=
//     'Register gmail add'=
// &if=`
//             updateGmailAdd
//             && !updateGmailAdd.startsWith("https://")
//             && !updateGmailAdd.includes("mail")
//             `
// &"exit invalid gmail url"=
//     "jsToast.short(`invalid gmail url ${updateGmailAdd}`);"
//     &ifAfter:=
//     "jsToast.short('after');"
//     &ifAfter:=
//     "exitZero();"
//     &if=
//     `updateGmailAdd`
//     &"update gmail ad"=
//         "jsFileSystem.write(
//             `${cmdTtsPlayerManagerGmailAdTsvPath}`,
//     `${gmailAdTsvKey}\t${updateGmailAdd}`
// )",