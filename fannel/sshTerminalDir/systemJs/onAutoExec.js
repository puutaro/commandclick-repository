

jsListSelect.initListFile(
    `${sshTerminalCmdListFilePath}`,
    jsFileSystem.readLocalFile(
        `${sshTerminalCmdListSrcFilePath}`
    )
);

jsListSelect.initListFile(
    `${sshTerminalExtraKeyListFilePath}`,
    jsFileSystem.readLocalFile(
        `${sshTerminalExtraKeySrcListFilePath}`
    )
);


launchTerminalAndSshDialog();

function launchTerminalAndSshDialog(){
    const terminalUrl =
        `http://127.0.0.1:18080/?hostname=127.0.0.1&port=10022&username=cmdclick&password=Y21kY2xpY2s=&command=script%20-qf%20script.log`;
    const loadJsCon =
        jsUrl.makeJsUrlFromCon(`jsUrl.loadUrl("${terminalUrl}")`);
    const pageFinishedLoadCon =
        jsUrl.makeJsUrl(`${sshTerminalNoArgsJs}`);
    jsUbuntu.boot();
    const cmdValsConSaved = jsScript.readCmdValsCon("${0}");
    const ON_AUTO_LAUNCH_SSH_DIALOG = jsScript.subValOnlyValue(
        "ON_AUTO_LAUNCH_SSH_DIALOG",
        cmdValsConSaved
    ) === "ON";
    if(!ON_AUTO_LAUNCH_SSH_DIALOG) {
        jsUrl.loadUrl(loadJsCon);
        return;
    }
    const isDropbearName = jsUbuntu.isProc("dropbear");
    const isDropbearPort = jsUbuntu.isProc("10022");
    const isDorpbearProc = isDropbearName && isDropbearPort;
    if(!isDorpbearProc) return;
    jsUrl.loadUrlWithPageFinishedLoadCon(
        loadJsCon,
        pageFinishedLoadCon,
        1000,
    );
};