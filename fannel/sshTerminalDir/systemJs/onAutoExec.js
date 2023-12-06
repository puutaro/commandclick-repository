

jsListSelect.initListFile(
    `${sshTerminalCmdListFilePath}`,
    jsFileSystem.readLocalFile(
        `${sshTerminalCmdListSrcFilePath}`
    ).replaceAll("\n", "\t")
);

jsListSelect.initListFile(
    `${sshTerminalExtraKeyListFilePath}`,
    jsFileSystem.readLocalFile(
        `${sshTerminalExtraKeySrcListFilePath}`
    ).replaceAll("\n", "\t")
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
    const ON_AUTO_LAUNCH_SSH_DIALOG = jsScript.readCmdVal(
        "ON_AUTO_LAUNCH_SSH_DIALOG",
        `${sshTerminalPath}`,
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
    // jsUbuntu.bootOnExec(
    //     loadJsCon,
    //     1000
    // );

};